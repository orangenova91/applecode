// src/app/api/sheet-data/route.js

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// 환경 변수 로드
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID; 

// 🔑 서비스 계정 인증 및 Sheets API 로직
export async function GET(request) {
    if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
        console.error("환경 변수 GOOGLE_SERVICE_ACCOUNT_KEY가 설정되지 않았습니다.");
        return NextResponse.json(
            { error: '서버 설정 오류: 인증 키가 누락되었습니다.' },
            { status: 500 }
        );
    }

    try {
        // 1. JSON 문자열 파싱
        const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);
        
        // 2. private_key의 줄바꿈 문자열을 실제 줄바꿈 문자로 변환합니다. (최종 강화)
        // 환경 변수에 따라 \n이 \\n으로 저장되거나, JSON.parse 과정에서 \n으로 남아있을 수 있어,
        // API에 전달하기 전 최종적으로 \n으로 강제 변환합니다.
        const privateKey = credentials.private_key
            .replace(/\\n/g, '\n') // 이중 백슬래시를 단일 줄바꿈으로 변환 (클라우드 환경 대응)
            .replace(/\n/g, '\n'); // 줄바꿈 문자를 다시 줄바꿈 문자로 확인 (로컬 환경 대응)
        
        // 3. Google Auth 객체 생성 (JWT 인증 방식)
        // 이 JWT 객체 자체가 인증된 클라이언트 역할을 합니다.
        const auth = new google.auth.JWT(
            credentials.client_email,
            null,
            privateKey, // 👈 엄격하게 처리된 privateKey 전달
            ['https://www.googleapis.com/auth/spreadsheets.readonly']
        );
        
        // 4. Sheets API 초기화 및 인증
        // Sheets API 호출 직전에 auth.authorize()를 호출하여 토큰을 갱신합니다.
        await auth.authorize();
        
        const sheets = google.sheets({ version: 'v4', auth: auth }); // auth 객체를 직접 전달

        // 5. Sheets API 호출
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A1:C5', // 데이터를 가져올 범위
        });

        // 6. 데이터 가공 (기존 로직 유지)
        const rows = response.data.values;
        let sheetRecords = [];

        if (rows && rows.length) {
            const headers = rows[0];
            sheetRecords = rows.slice(1).map(row => {
                let record = {};
                headers.forEach((header, index) => {
                    record[header] = row[index];
                });
                return record;
            });
        }

        return NextResponse.json({ sheetRecords });

    } catch (error) {
        console.error('Sheets API 인증/파싱/호출 오류:', error);
        
        let errorMessage = 'Google Sheets 데이터 처리 중 오류가 발생했습니다.';
        if (error.code === 403 || (error.message && error.message.includes('unregistered callers'))) {
            // 403 오류에 대한 명확한 메시지를 반환합니다.
            errorMessage = `권한 오류 (403): '${credentials?.client_email}' 이메일을 스프레드시트에 '뷰어' 권한으로 공유했는지 확인하세요.`;
        } else if (error.name === 'SyntaxError') {
             errorMessage = '환경 변수 JSON 파싱 오류. 키 내용을 확인해주세요.';
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}