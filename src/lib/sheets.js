// src/lib/sheets.js
import { GoogleSpreadsheet } from 'google-spreadsheet';

// .env.local에서 환경 변수를 가져옵니다.
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

// PRIVATE_KEY의 개행 문자를 실제 '\n'으로 변환하는 유틸리티 함수
const formattedPrivateKey = PRIVATE_KEY?.replace(/\\n/g, '\n');

/**
 * Google Spreadsheet에서 데이터를 가져오는 함수 (서버 전용)
 * @param {number} sheetIndex 가져올 시트의 인덱스 (0부터 시작)
 * @returns {Promise<Array<Object>>} 가공된 데이터 배열
 */
export async function fetchSpreadsheetData(sheetIndex = 0) {
  console.log(CLIENT_EMAIL)
  console.log(formattedPrivateKey)
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !formattedPrivateKey) {
    throw new Error("Google Sheets 인증 정보가 설정되지 않았습니다. .env.local 파일을 확인하세요.");
  }

  try {
    // 1. 문서 객체 초기화와 서비스 계정 인증을 동시에 처리
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, {
      // 💡 생성자에 인증 정보를 객체로 전달합니다. (v4+ 권장 방식)
      auth: {
        client_email: CLIENT_EMAIL,
        private_key: formattedPrivateKey,
      }
    });

    // doc.useServiceAccountAuth(...) 코드를 제거합니다.
    // 2. 문서 정보 로드
    await doc.loadInfo(); 

    // 3. 특정 시트 선택
    const sheet = doc.sheetsByIndex[sheetIndex]; 

    // 4. 시트의 모든 행(데이터) 가져오기
    // ... 나머지 데이터 로드 로직은 동일하게 유지
    const rows = await sheet.getRows();

    const data = rows.map(row => ({
        id: row.get('ID'), 
        date: row.get('일정 날짜'), 
        content: row.get('주요 내용'),
    })); 

    return data;
  } catch (error) {
    console.error("스프레드시트 데이터 로드 중 오류 발생:", error);
    throw new Error("스프레드시트 API 통신에 실패했습니다.");
  }
}