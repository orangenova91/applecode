// app/api/sheets/route.js (GET 함수만 수정)

// GET 함수는 req 객체를 받습니다.
export async function GET(request) { 
    try {
      // URL에서 searchParams(쿼리 파라미터)를 가져옵니다.
      const { searchParams } = new URL(request.url);
      const sheetName = searchParams.get('sheet'); // 예: ?sheet=공지사항
  
      if (!sheetName) {
        return NextResponse.json({ message: '필수 시트 이름(query: sheet)이 누락되었습니다.' }, { status: 400 });
      }
  
      // 1. 인증 및 sheets 객체 생성 (동일)
      // ... 
  
      // 2. 요청받은 시트 이름으로 범위 설정
      const range = `${sheetName}!A1:Z100`; 
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
      });
  
      const values = response.data.values || [];
  
      if (values.length === 0) {
         return NextResponse.json({ message: `시트 [${sheetName}] 데이터를 찾을 수 없습니다.` }, { status: 404 });
      }
  
      // 3. 해당 시트 데이터 반환
      return NextResponse.json({ data: values, sheet: sheetName }, { status: 200 });
  
    } catch (error) {
        // 1. 서버 콘솔에 상세 오류 로그 출력 (디버깅용)
        console.error('Google Sheets API 호출 또는 처리 오류:', error); 
        
        // 2. 500 응답을 즉시 반환하여 Next.js 핸들러 오류를 방지
        //    'error.message'를 포함하여 클라이언트가 오류 원인을 짐작하도록 돕습니다.
        return NextResponse.json(
          { 
            message: '서버 내부 오류로 시트 데이터를 불러올 수 없습니다.', 
            // ⚠️ 보안상 민감한 정보를 클라이언트에 노출하지 않도록 주의!
            //    개발 단계에서는 편리하지만, 운영 환경에서는 error.message 대신 
            //    'Internal Server Error'와 같은 일반 메시지를 사용해야 합니다.
            details: error.message 
          }, 
          { status: 500 }
        );
      }
    } // 👈 GET 함수는 여기서 종료되며, 모든 경로가 응답을 반환했습니다.
  