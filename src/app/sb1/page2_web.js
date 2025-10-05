

"use client"; // 👈 이 지시어를 추가하여 클라이언트 컴포넌트로 지정합니다.

import { useState, useEffect } from 'react';

// CSV 형식의 텍스트 데이터를 JavaScript 객체 배열로 변환하는 유틸리티 함수
const parseCSV = (text) => {
    // 1. 텍스트를 줄바꿈 기준으로 분리하고 빈 줄을 제거합니다.
    const lines = text.trim().split('\n');
    // 2. 첫 번째 줄을 헤더(키)로 사용합니다.
    const headers = lines[0].split(',').map(header => header.trim());
    
    // 3. 나머지 줄을 데이터로 변환합니다.
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const result = {};
        headers.forEach((header, i) => {
            // 헤더와 값 쌍을 객체에 저장
            result[header] = values[i] ? values[i].trim() : ''; 
        });
        return result;
    });
};

// Schoolcalendar Component
export default function Schoolcalendar({ subject }) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // DUMMY DATA simulating a fetch from a published Google Sheet JSON/CSV
    const dummyGoogleSheetData = [
        { Date: '10/15', Event: '중간고사 시작', Category: '시험' },
        { Date: '10/25', Event: '개교기념일', Category: '휴일' },
        { Date: '11/11', Event: '수능일 (휴교)', Category: '휴일' },
        { Date: '12/18', Event: '기말고사 시작', Category: '시험' },
        { Date: '12/25', Event: '크리스마스', Category: '휴일' },
    ];

    useEffect(() => {
        // --- 구글 스프레드시트 데이터 불러오기 로직 (설명) ---
        
        // 🚨 중요: 데이터를 CSV로 게시한 후 사용해야 합니다.
        // Google 스프레드시트: '파일' > '공유' > '웹에 게시' > '형식: CSV'를 선택해야 합니다.
        
        const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1BJDfJgz714OHbOcS-pvw8ZcKS6rrtDWeajI9q3Q1EsA/edit?gid=0#gid=0'; 

        const fetchData = async () => {
            try {
                // 현재는 더미 데이터를 사용하는 것으로 대체
                await new Promise(resolve => setTimeout(resolve, 500)); 
                
                setEvents(dummyGoogleSheetData);
                setError(null);

                // --- 실제 fetch 코드 (주석 처리) ---
                /* const response = await fetch(SPREADSHEET_URL);
                if (!response.ok) throw new Error('Failed to fetch calendar data');
                
                // 1. 응답을 텍스트(CSV)로 가져옵니다.
                const csvText = await response.text();
                
                // 2. CSV 파서를 사용하여 객체 배열로 변환합니다.
                const data = parseCSV(csvText);
                setEvents(data); 
                */}

             catch (err) {
                console.error("캘린더 데이터 로딩 오류:", err);
                // CSV 파싱 오류 가능성도 포함하여 에러 메시지 업데이트
                setError("학사 일정을 불러오는 데 실패했습니다. (공개 URL 및 CSV 형식 확인 필요)");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    // 카테고리별 색상 설정
    const getCategoryColor = (category) => {
        // 공백 제거 후 비교
        const normalizedCategory = category.trim(); 
        
        switch (normalizedCategory) {
            case '시험':
                return 'bg-red-500 text-white';
            case '휴일':
                return 'bg-blue-500 text-white';
            case '행사':
                return 'bg-purple-500 text-white';
            default:
                return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-100 max-w-lg mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2">
                🏫 학사 일정
            </h2>

            {isLoading && (
                <div className="text-center py-8 text-indigo-600 font-semibold">
                    일정 데이터를 불러오는 중...
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-600 border border-red-300 bg-red-50 rounded-lg p-4">
                    오류: {error}
                </div>
            )}

            {!isLoading && !error && (
                <div className="space-y-4">
                    {events.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">등록된 학사 일정이 없습니다.</p>
                    ) : (
                        events.map((event, index) => (
                            <div 
                                key={index} 
                                className="flex items-center space-x-4 p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm"
                            >
                                {/* 날짜 */}
                                <div className="flex-shrink-0 text-center">
                                    <span className="text-xl font-bold text-gray-800 block">{event.Date}</span>
                                    <span className="text-xs text-gray-500 block">날짜</span>
                                </div>
                                
                                {/* 이벤트 상세 */}
                                <div className="flex-grow">
                                    <p className="text-lg font-semibold text-gray-900">{event.Event}</p>
                                    <span 
                                        className={`inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(event.Category)}`}
                                    >
                                        {event.Category}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            
            <div className="mt-8 text-sm text-gray-500 border-t pt-4">
                <p>현재 데이터는 더미(Dummy) 일정입니다. 실제 구글 스프레드시트의 **공개 웹 게시 URL**을 사용하여 데이터를 연동할 수 있습니다. 데이터를 CSV 형식으로 게시하고, 주석 처리된 `fetch` 코드를 사용해 보세요.</p>
            </div>
        </div>
    );
}
