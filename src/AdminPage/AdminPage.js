import { 
    CRow, 
    CCol,
    CTabs,
    CTabList,
    CTab,
    CContainer,
    CButton,
    CForm,
    CFormFloating,
    CFormInput,
    CFormLabel,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import MyPageInfo from "../MyPage/MyPageInfo"
import UserPageInfo from "./UserPageInfo"

import api from '../api/api';

function AdminPage(props) {
    //프로필 뱃지 설정 변수
    const [fontSize, setFontSize] = useState(30);
    
    const [check, setCheck] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [pw, setPw] = useState('');
    const userId = localStorage.getItem("id");

    const [userName, setUserName] = useState(localStorage.getItem("name") ? localStorage.getItem("name")[0] : '');

    //active 탭 설정 변수
    const [activeTab, setActiveTab] = useState(1);

    //로그아웃 호출 함수
    function onLogout() {
        props.onLogout();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            conTest();
        }
    };

    //비밀번호 확인
    const conTest = () => {
        const data = { userId, userPw: pw };
        api.post('mypages/mypagePw', data)
            .then((res) => {
                if (res.data.success) {
                    setCheck(true);
                    updateFontSize();
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                alert(err.response.data.message);
                console.log(err);
            });
    };

    const updateFontSize = () => {
        const div = document.getElementById('profileCircle');
        if (div) {
            const size = div.offsetWidth;
            setFontSize(`${size * 0.7}px`);
        }
    };

    //프로필 뱃지 생성
    useEffect(() => {
        const name = userName;
        if (name) {
          setUserName(name[0]);
        }
        // 마이페이지 진입 시 Footer 숨기기
        props.setShouldDisplayFooter(false);
    
        // 컴포넌트 언마운트 시 Footer 표시
        return () => {
          props.setShouldDisplayFooter(true);
        };
      }, []);

      useEffect(() => {       

        // 조건에 관계없이 초기값 업데이트
        updateFontSize();
        window.addEventListener('resize', updateFontSize);

        return () => {
            window.removeEventListener('resize', updateFontSize);
        };
    }, [check]);

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
        <main className="admin-page">
            {(check === false && isLoggedIn) &&
            <div className="mypage-entry-form">
                <p className="sub-title">Admin Page</p>
                <h1 className="main-title">관리자페이지</h1>
                <CForm>
                    <CFormFloating className="mb-3">
                        <CFormInput
                            type="password"
                            id="floatingPassword"
                            value={pw}
                            onChange={e => setPw(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="password" />
                        <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                    </CFormFloating>

                    <CButton
                        onClick={conTest}
                        className="p-button"
                        variant="mb-3 p-1 px-3"
                        style={{ borderRadius: '13px', borderWidth: '2px' }}>
                        확인
                    </CButton>
                </CForm>
            </div>
            }
            {(check === true && isLoggedIn) &&
            <CContainer>
                <CRow>
                    <CCol xs={2} md={3} style={{ background: 'linear-gradient(180deg, #FFF 0%, #00AF50 100%)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <div 
                            id="profileCircle"
                            style={{
                                width: '60%',
                                aspectRatio: '1',
                                backgroundColor: '#28a745',
                                borderRadius: '50%',
                                fontSize: fontSize,
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
                            <CTabList variant="pills" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
                                <CTab 
                                    itemKey={1}
                                    style={getTabStyle(1)}                                 
                                    onClick={() => handleTabClick(1)}
                                >
                                    회원 정보 조회
                                </CTab>
                                <CTab 
                                    itemKey={2}
                                    style={getTabStyle(2)}                                
                                    onClick={() => handleTabClick(2)}
                                >
                                    관리자 정보 조회
                                </CTab>
                            </CTabList>
                        </CTabs>                                           
                    </CCol>

                    <CCol xs={8} md={8} style={{ padding: '20px' }}>
                        { (activeTab === 1)
                            && <UserPageInfo />
                        }
                        { (activeTab === 2)
                            && <MyPageInfo />
                        }
                        {/* { (activeTab === 1)
                            && <MyPageInfo />
                        }
                        { (activeTab === 2)
                            && <ReservationInfo />
                        }
                        { (activeTab === null)
                            && <DeleteAccount onLogout={onLogout}/>
                        } */}
                    </CCol>
                </CRow>
            </CContainer>
            }
        </main>
    )
}

export default AdminPage;