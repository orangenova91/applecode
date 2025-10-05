// src/app/page.js 또는 src/app/sb1/page.js

// API Route 호출 함수 (이전과 동일)
async function getSheetData(name) {
    // name (여기서는 'sheet2') 값을 사용하여 API 엔드포인트 구성
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/sheets?sheet=${name}`;
  
    const res = await fetch(apiEndpoint, {
      // 적절한 캐시 재검증 시간 설정 (예: 5분마다 갱신)
      next: { revalidate: 300 } 
    }); 
  
    if (!res.ok) {
      console.error(`[${name}] 시트 호출 실패`);
      const errorBody = await res.json().catch(() => ({ message: '알 수 없는 오류' }));
      console.error(`서버 응답 오류 메시지:`, errorBody.message);
      return { data: [] }; 
    }
  
    return res.json();
  }
  
  export default async function HomePage() {
    // 1. 'sheet2' 시트의 데이터를 비동기로 가져옵니다.
    const { data: sheet2Data } = await getSheetData('sheet2');
    
    // (만약 다른 시트도 필요하다면 아래처럼 추가 호출)
    // const { data: anotherSheetData } = await getSheetData('다른시트이름'); 
  
    // 데이터가 배열 형태로 들어왔다고 가정하고 렌더링합니다.
    return (
      <div>
        <h1>'sheet2' 시트 데이터 표시</h1>
        
        {sheet2Data && sheet2Data.length > 0 ? (
          <table>
            <thead>
              {/* 첫 번째 행을 헤더로 사용 */}
              <tr>
                {sheet2Data[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 첫 번째 행을 제외한 나머지 데이터 행을 표시 */}
              {sheet2Data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>시트 'sheet2'의 데이터를 불러오는 데 실패했거나 데이터가 없습니다. 서버 로그를 확인하세요.</p>
        )}
      </div>
    );
  }