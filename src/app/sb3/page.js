// src/app/page.js

// getSheetData 함수가 시트 이름(name)을 인자로 받도록 수정
async function getSheetData(name) {
    // Next.js API Route 호출 시 쿼리 파라미터로 시트 이름을 전달합니다.
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sheets?sheet=${name}`, { // 👈 URL에 ?sheet=sheet2 추가
      // 캐싱 옵션 설정 (예: 5분마다 리프레시)
      next: { revalidate: 300 } // 0 대신 300초로 변경하여 캐싱 효율을 높이는 것을 권장합니다.
    }); 
  
    if (!res.ok) {
      console.error(`[${name}] 시트 호출 실패`);
      // 오류 처리 로직 추가 가능
      return { data: [] }; 
    }
  
    return res.json();
  }
  
  // Schoolcalendar 컴포넌트 내부
  export default async function Schoolcalendar() {
    // 1. 'sheet2' 시트의 데이터를 명시적으로 요청합니다.
    const { data: sheet2Data } = await getSheetData('sheet2'); // 👈 여기가 핵심!
  
    return (
      <div>
        <h1>Sheet2 데이터 (Google Sheets)</h1>
        {sheet2Data && sheet2Data.length > 0 ? (
          <table>
            {/* ... sheet2Data를 사용하여 데이터 렌더링 ... */}
            <thead>
              <tr>
                {/* 첫 번째 행을 헤더로 가정 */}
                {sheet2Data[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 데이터 행 (첫 번째 행 제외) */}
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
          <p>시트 'sheet2'의 데이터를 불러오는 중이거나 데이터가 없습니다.</p>
        )}
      </div>
    );
  }