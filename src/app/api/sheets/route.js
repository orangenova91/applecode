// app/api/sheets/route.js

import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
// GOOGLE_SHEETS_RANGE 환경 변수는 이제 사용하지 않습니다.

export async function GET(request) { // 👈 request 객체를 받아야 URL 정보를 얻을 수 있습니다.
  try {
    // 1. URL 쿼리 파라미터에서 시트 이름 ('sheet' 키)을 추출합니다.
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get('sheet'); // 예: 'sheet2'

    if (!sheetName) {
      // 시트 이름이 누락된 경우 명확한 오류 반환
      return NextResponse.json({ message: '시트 이름(query: sheet)이 누락되었습니다.' }, { status: 400 });
    }

    // 2. JWT 인증 및 sheets 객체 생성 (이전과 동일)
    const auth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // 3. 요청받은 시트 이름으로 'range'를 동적으로 설정합니다.
    // '시트이름!A1:Z' 형태로 범위 지정 (Z는 데이터가 있을법한 충분한 열)
    const range = `${sheetName}!A1:Z`; 
    
    // 4. 스프레드시트 데이터 읽기
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range, // 👈 동적으로 생성된 range 사용
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      return NextResponse.json({ message: `시트 [${sheetName}] 데이터를 찾을 수 없습니다.` }, { status: 404 });
    }

    // 5. 데이터를 JSON 형태로 반환
    return NextResponse.json({ data: values }, { status: 200 });
  } catch (error) {
    // ... 오류 처리 로직 (이전에 수정한 catch 블록 사용)
    console.error('Google Sheets API 호출 오류:', error);
    // ... (오류 응답 반환)
  }
}