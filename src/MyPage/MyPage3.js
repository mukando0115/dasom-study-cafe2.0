import { 
    CRow, 
    CCol,
    CTabs,
    CTabList,
    CTab,
    CContainer,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { IoExitOutline } from "react-icons/io5";

function MyPage(props) {
    //프로필 뱃지 설정 변수
    const [fontSize, setFontSize] = useState(0);
    const circleRef = useRef(null);

    //active 탭 설정 변수
    const [activeTab, setActiveTab] = useState(1);

    //프로필 뱃지 생성
    useEffect(() => {
        const updateFontSize = () => {
            if (circleRef.current) {
                const size = circleRef.current.offsetWidth; // 도형의 크기 (가로)
                setFontSize(size * 0.7); // 도형 크기의 70%로 폰트 사이즈 설정
            }
        };

        updateFontSize();
        window.addEventListener('resize', updateFontSize); // 창 크기 변경 시 업데이트

        return () => {
            window.removeEventListener('resize', updateFontSize);
        };
    }, []);
    

    const handleTabClick = (tabKey) => {
        setActiveTab(tabKey);
    };

    const getTabStyle = (tabKey) => {
        return {
            width: '100%',
            backgroundColor: activeTab === tabKey ? 'black' : 'white',
            color: activeTab === tabKey ? 'white' : 'black',
            transition: 'background-color 0.2s, color 0.2s',
            borderRadius: '0',
        };
    };

    return (
        <main className="my-page">
            <CContainer>
                <CRow>
                    <CCol xs={2} md={3} style={{ background: 'linear-gradient(180deg, #FFF 0%, #00AF50 100%)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <div 
                            ref={circleRef}
                            style={{
                                width: '60%',
                                aspectRatio: '1',
                                backgroundColor: '#28a745',
                                borderRadius: '50%',
                                fontSize: `${fontSize}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                margin: '30% auto',
                            }}
                        >
                            {localStorage.getItem("name")[0]}
                        </div>
                        <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
                            <CTabList variant="pills" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', }}>
                                <CTab 
                                    itemKey={1}
                                    style={getTabStyle(1)}                                 
                                    onClick={() => handleTabClick(1)}
                                >
                                    회원 정보
                                </CTab>
                                <CTab 
                                    itemKey={2}
                                    style={getTabStyle(2)}                                
                                    onClick={() => handleTabClick(2)}
                                >
                                    예약 정보
                                </CTab>
                            </CTabList>
                        </CTabs>

                        {   (activeTab === 1)
                            && <div style={{ display: 'block' }}>
                                    <IoExitOutline className='mt-5' style={{ transform: 'scaleX(-1)' }}/>
                                    <p style={{ marginLeft: '10px' }}>회원탈퇴</p>
                                </div>                           
                        }                                             
                    </CCol>

                    <CCol xs={8} md={8} style={{ backgroundColor: "red", padding: '20px' }}>
                        { (activeTab === 1)
                            && <p>회원 정보</p>
                        }
                        { (activeTab === 2)
                            && <p>예약 정보</p>
                        }
                    </CCol>
                </CRow>
                
            </CContainer>            
        </main>
    )
}

export default MyPage;