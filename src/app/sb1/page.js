// src/app/page.js
import Link from "next/link"  

// getSheetData 함수가 시트 이름(name)을 인자로 받도록 수정
async function getSheetData(name) {
  // Next.js API Route 호출 시 쿼리 파라미터로 시트 이름을 전달합니다.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sheets?sheet=${name}`, { // 👈 URL에 ?sheet=sheet2 추가
    // 캐싱 옵션 설정 (예: 5분마다 리프레시)
    next: { revalidate: 10 } // 0 대신 300초로 변경하여 캐싱 효율을 높이는 것을 권장합니다.
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
  const { data: sheetData } = await getSheetData('sheet1'); // 👈 여기가 핵심!

  
  return (
    <div>
      {/*
      타입 테스트
      <div>Data Type: {typeof sheetData}</div> 
      <div>Array Type: {Array.isArray([1,2,3]) ? '배열입니다 (Array)' : '배열이 아닙니다 (Not Array)'}</div>
      */}
      <h1>학사일정(Google Sheets)</h1>
      <Link href={process.env.SPSHEET} target="_blank" rel="noopener noreferrer">
      
      학사일정 수정
      </Link>
      {sheetData && sheetData.length > 0 ? (
        <table>
          {/* ... sheet2Data를 사용하여 데이터 렌더링 ... */}
          <thead>
            <tr>
              {/* 첫 번째 행을 헤더로 가정 */}
              {sheetData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 데이터 행 (첫 번째 행 제외) */}
            {sheetData.slice(1).map((row, rowIndex) => (
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