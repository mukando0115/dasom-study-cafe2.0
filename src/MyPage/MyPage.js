import { useState } from 'react';
import { CForm, CFormFloating, CFormInput, CFormLabel } from '@coreui/bootstrap-react'
import Button from 'react-bootstrap/Button';
import api from '../api/api';

function MyPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [pw, setPw] = useState('');
    const [check, setCheck] = useState(false);

    //서버로 보낼 로그인 데이터
    const data = {
        "userId": userId,
        "userPw": pw,
    };

    //서버 전송 함수(axios post)
    const conTest = () => api.post('login', data)
    .then((res) => {
        //로그인 성공했을 때
        if(res.data.success) {            
            setCheck(true);
        }
        //로그인 실패했을 때
        else{
            alert(res.data.message);
        }
    }).catch((err) => {
        alert(err.response.data.message);
        console.log(err);
    })


    return (
        <main className="my-page">
            <p className="sub-title">My page</p>
            <h1 className="main-title">마이페이지</h1>

            {(check === false && isLoggedIn) && 
            <CForm className="mypage-form">
                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="password" 
                        id="floatingPassword" 
                        value={pw} 
                        onChange={e => setPw(e.target.value)} 
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                </CFormFloating>

                {/* 버튼 */}
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
            <CForm>
                여기다가 마이페이지 정보 출력하시면 됩니당...
                아이디, 이름, 전화번호, 비밀번호....
            </CForm>
            }
            
        </main>
    )
}

export default MyPage;