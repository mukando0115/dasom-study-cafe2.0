import { useState, useEffect } from 'react';
import { CFormFloating, CFormInput, CFormLabel, CCollapse } from '@coreui/bootstrap-react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import api from '../api/api';

function MyPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    useEffect(() => {
        if (isLoggedIn) {
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
    }, [isLoggedIn, userId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="my-page">
            {(isLoggedIn) &&
                <div className="mypage-form">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px' }}>
                    <p className="sub-title">회원 정보</p>
                    </div>
                    <hr />

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
