"use client";
import { useState } from 'react';

// 탭 데이터 구조를 정의합니다.
const TAB_ITEMS = [
    { name: 'attendance', label: '출결' },
    { name: 'board', label: '게시판' },
    { name: 'assignment', label: '수업 과제' },
    { name: 'users', label: '사용자' },
    { name: 'grades', label: '성적' },
];
// 이 컴포넌트가 subject 데이터를 props로 받습니다.

export default function ClassroomTabs({ subject, decodedId }) {
    // 'board'를 초기 활성 탭으로 설정
    const [activeTab, setActiveTab] = useState('board');

    // 탭 내용 렌더링 함수
    const renderContent = () => {
        switch (activeTab) {
            case 'attendance':
                return (
                    <div className="tab-content">
                        <h2>출결</h2>
                        <p>{subject.title} 출결 확인입니다.</p>
                        {/* 실제 게시판 컴포넌트가 여기에 들어갑니다. */}
                    </div>
                );
            case 'board':
                return (
                    <div className="tab-content">
                        <h2>게시판</h2>
                        <p>{subject.title} 강좌의 공지사항 및 토론 공간입니다.</p>
                        {/* 실제 게시판 컴포넌트가 여기에 들어갑니다. */}
                    </div>
                );
            case 'assignment':
                return (
                    <div className="tab-content">
                        <h2>수업 과제</h2>
                        <p>현재 부여된 과제 목록을 표시합니다.</p>
                        {/* 과제 목록 컴포넌트 */}
                    </div>
                );
            case 'users':
                return (
                    <div className="tab-content">
                        <h2>사용자</h2>
                        <p>강좌에 등록된 학생 및 교사 목록을 표시합니다.</p>
                    </div>
                );
            case 'grades':
                return (
                    <div className="tab-content">
                        <h2>성적</h2>
                        <p>학생의 성적 정보가 표시됩니다.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="classroom-tabs-wrapper">
            <h2>{decodedId} 강좌 관리</h2>

            {/* 1. 탭 네비게이션 동적 생성 */}
            <div className="tab-navigation">
                {TAB_ITEMS.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={activeTab === tab.name ? 'active' : ''}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 2. 탭 콘텐츠 영역 */}
            <div className="tab-display">
                {renderContent()}
            </div>

            
        </div>
    );
}
