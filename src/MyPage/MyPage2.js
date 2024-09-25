import { useState, useEffect } from 'react';
import { CForm, CFormFloating, CFormInput, CFormLabel, CCollapse, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardFooter } from '@coreui/bootstrap-react';
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
    const [footer, setFooter] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            conTest(); // 엔터 키가 눌리면 버튼 클릭 함수 호출
        }
    };

    const handleAccountDelete = () => {
        // 비밀번호 확인 로직 추가
        const deleteData = { userId, userPw: currentPassword };

        api.post('http://localhost:5000/api/delete-account', deleteData)
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
                                탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행하세요.
                                </CCardText>
                                <CCardFooter className="mb-4">
                                    비밀번호
                                    <CFormInput 
                                        type="password" 
                                        placeholder='비밀번호 입력' 
                                        value={currentPassword} 
                                        onChange={e => setCurrentPassword(e.target.value)}
                                    />
                                </CCardFooter>
                                <CButton 
                                    className='s-button m-1' 
                                    shape="rounded-0"
                                    onClick={handleAccountDelete}>확인</CButton>
                                <CButton 
                                    className='p-button m-1' 
                                    shape="rounded-0" 
                                    onClick={() => {
                                        setVisible(false);
                                    }}>취소</CButton>
                            </CCardBody>
                            </CCard>
                        </div>
                    }
                    
                    <div>
                        {userData && (
                            <div>
                                <p>이름: {userData.name}</p>
                                <p>아이디: {userData.userId}</p>
                                <p>전화번호: {userData.phone.slice(0,3)+'-'+userData.phone.slice(3,7)+'-'+userData.phone.slice(7)}</p>
                                <p>생년월일: {new Date(userData.birth).toLocaleDateString()}</p>
                                <p>가입일시: {new Date(userData.created_at).toLocaleString()}</p>
                            </div>
                        )}                        
                    </div>
                </div>
            }
        </main>
    );
}

export default MyPage;
