// src\app\sb2\[id]\page.js
import ClassroomTabs from "./ClassroomTabs";
export default async function classroom({params}) {
    
    // 1. URL 인코딩된 ID를 디코딩하여 사용합니다.
    const rawId = params.id;
    const decodedId = decodeURIComponent(rawId); 
    
    // 2. fetch 요청을 await 하고, 응답을 변환하는 코드를 추가합니다.
    const resp = await fetch(`http://localhost:9999/subject/${rawId}`); 
    
    // 3. 안전을 위해 응답 상태를 확인합니다.
    if (!resp.ok) {
        // 데이터가 없거나 서버 오류 시 처리
        console.error(`Fetch failed with status: ${resp.status}`);
        return <div>데이터를 불러오지 못했습니다.</div>;
    }
    
    // 4. 응답 본문을 JSON 객체로 변환하여 subject에 저장합니다.
    const subject = await resp.json();
    
    
    // 5. 서버에서 받은 데이터를 사용하여 렌더링합니다.
    return (
        <div>

            
            
            {/* subject 객체의 title 속성(강좌명)을 예시로 출력합니다. */}
            강좌명: {subject.subtitle}
            {/* 불러온 다른 정보들을 추가로 표시할 수 있습니다. */}
            (담당 교사: {subject.instructor},
            수업 장소: {subject.location})
            
        <ClassroomTabs subject={subject} decodedId={decodedId} />



        </div>
    )
}



