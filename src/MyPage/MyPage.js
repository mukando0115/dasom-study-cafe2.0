import { useState, useEffect } from 'react';
import { CForm, CFormFloating, CFormInput, CFormLabel, CCollapse, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardFooter } from '@coreui/bootstrap-react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import api from '../api/api';
import { FcHighPriority } from "react-icons/fc";
import { CButton } from '@coreui/react';

function MyPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [pw, setPw] = useState('');
    const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);
    const [footer, setFooter] = useState(false);
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 비밀번호 변경 상태 관리
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 서버로 보낼 로그인 데이터
    const data = {
        "userId": userId,
        "userPw": pw
    };

    const conTest = () => api.post('mypages/mypagePw', data)
        .then((res) => {
            if (res.data.success) {
                setCheck(true);
            } else {
                alert(res.data.message);
            }
        }).catch((err) => {
            alert(err.response.data.message);
            console.log(err);
        });

    // 비밀번호 변경 요청 함수
    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const passwordData = {
            userId: localStorage.getItem("id"),
            currentPw: currentPassword,
            newPw: newPassword
        };

        api.post('http://localhost:5000/api/pwchange', passwordData)
            .then(res => {
                if (res.data.success) {
                    alert("비밀번호가 성공적으로 변경되었습니다.");
                    setShowPasswordChange(false); // 변경 완료 후 입력 폼 숨김
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert("비밀번호 변경 중 오류가 발생했습니다.");
            });
    };

    useEffect(() => {
        if (check && isLoggedIn) {
            axios.get(`http://localhost:5000/api/mypages/${userId}`)
                .then(response => {
                    setUserData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('데이터를 가져오는 데 문제가 발생했습니다.');
                    setLoading(false);
                });
        }
    }, [check, isLoggedIn, userId]);

    if (loading && check) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="my-page">
            <p className="sub-title">My page</p>
            <h1 className="main-title">마이페이지</h1>

            {(check === false && isLoggedIn) &&
                <CForm className="mypage-entry-form">
                    <CFormFloating className="mb-3">
                        <CFormInput
                            type="password"
                            id="floatingPassword"
                            value={pw}
                            onChange={e => setPw(e.target.value)}
                            placeholder="password" />
                        <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                    </CFormFloating>

                    <Button
                        onClick={conTest}
                        className="p-button"
                        variant="mb-3 p-1 px-3"
                        size=""
                        style={{ borderRadius: '13px', borderWidth: '2px' }}>
                        확인
                    </Button>
                </CForm>
            }

            {(check === true && isLoggedIn) &&
                <div className="mypage-form">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px' }}>
                        <h2>회원 정보</h2>
                        <a 
                            onClick={() => {
                                alert('회원탈퇴 클릭됨');
                                setVisible(true);
                            }}
                            style={{color: "red", marginLeft: '10px', cursor: 'pointer' }}
                        ><FcHighPriority/> 회원탈퇴</a>                        
                    </div>                    
                    <hr/>
                    { visible 
                    && <div>
                            <CCard
                            textColor='danger'
                            className={`mb-3 border-top-danger border-top-3`}
                            style={{ maxWidth: '18rem' }}
                            >
                            <CCardHeader>회원탈퇴</CCardHeader>
                            <CCardBody>
                                <CCardTitle>정말 탈퇴하시겠습니까?</CCardTitle>
                                <CCardText>
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content. 정말로요???????????????????????????? 절대로 돌이킬 수 없습니다
                                </CCardText>
                                { footer
                                    && <CCardFooter className="mb-4">
                                            인증번호(OR비밀번호)
                                            <CFormInput type="text" placeholder='구차하게 굴거지롱' readOnly/>
                                        </CCardFooter>
                                }                                
                                <CButton 
                                    className='s-button m-1' 
                                    shape="rounded-0"
                                    onClick={() => {
                                        setFooter(true);
                                }}>확인</CButton>
                                <CButton 
                                    className='p-button m-1' 
                                    shape="rounded-0" 
                                    onClick={() => {
                                    setVisible(false);
                                    setFooter(false);
                                }}>취소</CButton>
                            </CCardBody>
                            </CCard>
                        </div>
                    }
                    
                    <div>
                        {userData && (
                            <div>
                                <p>이름: {userData.name}</p>
                                <p>
                                    아이디: {userData.user_id}
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="ms-3"
                                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                                    >
                                        비밀번호 변경
                                    </Button>
                                </p>
                                <p>전화번호: {userData.phone.slice(0,3)+'-'+userData.phone.slice(3,7)+'-'+userData.phone.slice(7)}</p>
                                <p>생년월일: {new Date(userData.birth).getFullYear()+'년 '
                                    +String(new Date(userData.birth).getMonth() + 1).padStart(2, '0')+'월 '
                                    +String(new Date(userData.birth).getDate()).padStart(2, '0')+'일'}</p>
                                <p>가입일시: {new Date(userData.created_at).getFullYear()+'년 '
                                    +String(new Date(userData.created_at).getMonth() + 1).padStart(2, '0')+'월 '
                                    +String(new Date(userData.created_at).getDate()).padStart(2, '0')+'일 '
                                    +new Date(userData.created_at).toLocaleString().slice(-11)}</p>
                            </div>
                        )}                        
                    </div>
                    {/* 비밀번호 변경 입력 폼 */}
                    <CCollapse visible={showPasswordChange}>
                        <div className="password-change-form">
                            <h3>비밀번호 변경</h3>
                            <div style={{ gap: '10px', display: 'inline-block', width: '100%' }}> {/* Flex 컨테이너 */}
                                <CFormFloating className="mb-3" style={{ flex: 1}}>
                                    <CFormInput
                                        type="password"
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        placeholder="현재 비밀번호"
                                    />
                                    <CFormLabel>현재 비밀번호</CFormLabel>
                                </CFormFloating>

                                <CFormFloating className="mb-3" style={{ flex: 1 }}>
                                    <CFormInput
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="새 비밀번호"
                                    />
                                    <CFormLabel>새 비밀번호</CFormLabel>
                                </CFormFloating>

                                <CFormFloating className="mb-3" style={{ flex: 1 }}>
                                    <CFormInput
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="비밀번호 확인"
                                    />
                                    <CFormLabel>비밀번호 확인</CFormLabel>
                                </CFormFloating>

                                <Button
                                    className="p-button"
                                    onClick={handlePasswordChange}
                                >
                                    비밀번호 변경
                                </Button>
                            </div>                                
                        </div>
                    </CCollapse>           
                </div>
            }
        </main>
    );
}

export default MyPage;