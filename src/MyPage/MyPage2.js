import { useState, useEffect } from 'react';
import { CForm, CFormFloating, CFormInput, CFormLabel, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardFooter, CCollapse } from '@coreui/bootstrap-react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import api from '../api/api';
import { FcHighPriority } from "react-icons/fc";
import { CButton } from '@coreui/react';

function MyPage(props) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [pw, setPw] = useState('');
    const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 비밀번호 변경 핸들러
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
                    alert("비밀번호가 변경되었습니다.");
                    setShowPasswordChange(false);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                alert("비밀번호 변경에 실패했습니다.");
                console.error(err);
            });
    };

    const conTest = () => {
        const data = { userId, userPw: pw };
        api.post('mypages/mypagePw', data)
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
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            conTest();
        }
    };

    const handleAccountDelete = () => {
        if (!isAgreed) {
            alert("동의해주세요");
            return;
        }

        const deleteData = { userId };
        api.post('http://localhost:5000/api/deleteAccount', deleteData)
            .then(res => {
                if (res.data.success) {
                    alert("회원 탈퇴가 완료되었습니다.");
                    props.onLogout();
                    window.location.href = '/';
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert("회원 탈퇴를 실패했습니다.");
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
                            onKeyDown={handleKeyDown}
                            placeholder="password" />
                        <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                    </CFormFloating>

                    <Button
                        onClick={conTest}
                        className="p-button"
                        variant="mb-3 p-1 px-3"
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
                                setShowPasswordChange(false); // 비밀번호 변경 창 닫기
                                setVisible(!visible); // 회원 탈퇴 창 토글
                            }}
                            style={{ color: "red", marginLeft: '10px', cursor: 'pointer' }}
                        ><FcHighPriority /> 회원탈퇴</a>
                    </div>
                    <hr />
                    {visible &&
                        <div>
                            <CCard
                                textColor='danger'
                                className={`mb-3 border-top-danger border-top-3`}
                                style={{ maxWidth: '18rem' }}
                            >
                                <CCardHeader>회원탈퇴</CCardHeader>
                                <CCardBody>
                                    <CCardTitle>정말 탈퇴하시겠습니까?</CCardTitle>
                                    <CCardText>
                                        탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행하세요.
                                    </CCardText>
                                    <CCardFooter className="mb-4">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={isAgreed}
                                                onChange={() => setIsAgreed(!isAgreed)}
                                            />
                                            동의합니다.
                                        </label>
                                    </CCardFooter>
                                    <CButton
                                        className='s-button m-1'
                                        shape="rounded-0"
                                        onClick={handleAccountDelete}
                                    >확인</CButton>
                                    <CButton
                                        className='p-button m-1'
                                        shape="rounded-0"
                                        onClick={() => setVisible(false)}
                                    >취소</CButton>
                                </CCardBody>
                            </CCard>
                        </div>
                    }

                    <div>
                        {userData && (
                            <div>
                                <p>이름: {userData.name}</p>
                                <p>아이디: {userData.userId}</p>
                                <p>전화번호: {userData.phone.slice(0, 3) + '-' + userData.phone.slice(3, 7) + '-' + userData.phone.slice(7)}</p>
                                <p>생년월일: {new Date(userData.birth).toLocaleDateString()}</p>
                                <p>가입일시: {new Date(userData.created_at).toLocaleString()}</p>
                                <p>
                                    아이디: {userData.userId}
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="ms-3"
                                        onClick={() => {
                                            setVisible(false); // 회원 탈퇴 창 닫기
                                            setShowPasswordChange(!showPasswordChange); // 비밀번호 변경 창 토글
                                        }}
                                    >
                                        비밀번호 변경
                                    </Button>
                                </p>
                            </div>
                        )}
                    </div>

                    <CCollapse visible={showPasswordChange}>
                        <div className="password-change-form">
                            <h3>비밀번호 변경</h3>
                            <div style={{ gap: '10px', display: 'inline-block', width: '100%' }}>
                                <CFormFloating className="mb-3" style={{ flex: 1 }}>
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
