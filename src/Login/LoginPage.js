import { useState, useEffect } from 'react';
import api from '../api/api';

import Button from 'react-bootstrap/Button';
import { CForm, CFormFloating, CFormInput, CFormLabel } from '@coreui/bootstrap-react'
import { PiSealCheckFill } from "react-icons/pi";
import loginButton from './btnG_완성형.png';

function LoginPage(props) {
    const [form, setForm] = useState({
        id: '',
        pw: '',
    });

    //Modal 데이터
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //서버로 보낼 로그인 데이터
    const data = {
        "userId": form.id,
        "userPw": form.pw
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            conTest(); // 엔터 키가 눌리면 버튼 클릭 함수 호출
        }
    };
    
    //서버 전송 함수(axios post)
    const conTest = () => api.post('login', data)
    .then((res) => {
        //로그인 성공했을 때
        if(res.data.success) {        
            localStorage.setItem("id", form.id);
            localStorage.setItem("name", res.data.name);
            alert(`${localStorage.getItem("name")}님 로그인 되었습니다`);
            // handleShow();
            props.onLogin();
            window.location.href = '/';
        }
        //로그인 실패했을 때
        else{
            // alert(res.data.message);
            alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
            console.log(res);
        }
    }).catch((err) => {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        console.log(err);
    })    


    // ** 네이버 로그인 초기화 부분 추가 시작 **
    // const handleLoginMessage = (event) => {
    //     if (event.origin === 'http://localhost:3000') {
    //         console.log('Received message:', event.data); // 메시지 로그 추가
    //         const { accessToken } = event.data;
    //         if (accessToken) {
    //             localStorage.setItem("accessToken", accessToken);
    //             alert('네이버 로그인이 완료되었습니다.');
    //             props.onLogin();
    //             window.location.href = "/"; // 루트 페이지로 리다이렉션
    //         } else {
    //             console.error('Access token is undefined');
    //         }
    //     }
    // };
    
    // useEffect(() => {
    //     window.addEventListener('message', handleLoginMessage);
    //     return () => {
    //         window.removeEventListener('message', handleLoginMessage);
    //     };
    // }, []);

    const handleLoginClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/naverlogin', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
    
            if (data.success) {
                const loginWindow = window.open(data.api_url, 'naverLogin', 'width=500,height=600');
    
                // 메시지 수신 핸들러 등록
                const handleLoginMessage = (event) => {
                    // 출처 확인
                    if (event.origin === 'http://localhost:5000') {
                        const userData = event.data.userData.response;
                        if (event.data.userData.message === 'success') {
                            console.log('User Data:', userData);           
                            localStorage.setItem("id", userData.id);
                            localStorage.setItem("name", userData.name);
                            localStorage.setItem("naver", "1");
                            alert(`${localStorage.getItem("name")}님 로그인 되었습니다`);
                            // handleShow();
                            props.onLogin();
                            window.location.href = '/';                 
                        }
                    }
                };
    
                window.addEventListener('message', handleLoginMessage);
    
                // 새 창이 닫히면 메시지 리스너 제거
                loginWindow.onbeforeunload = () => {
                    window.removeEventListener('message', handleLoginMessage);
                };
            } else {
                console.error('로그인 요청 실패:', data);
            }
        } catch (error) {
            console.error('네이버 로그인 요청 중 오류 발생:', error);
        }
    };
    
    //화면부
    return (
        <main className="login-page">
            <div className="login-logo"></div>

            <CForm className="login-form">

                {/* 아이디 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="id" 
                        id="floatingId" 
                        value={form.id} 
                        onChange={e => setForm({...form, id: e.target.value})} 
                        placeholder="abcd1234"/>
                    <CFormLabel htmlFor="floatingId">아이디</CFormLabel>
                </CFormFloating>

                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="password" 
                        id="floatingPassword" 
                        value={form.pw} 
                        onChange={e => setForm({...form, pw: e.target.value})} 
                        onKeyDown={handleKeyDown}
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                </CFormFloating>

                {/* 로그인 정보 저장 & 비밀번호 찾기 */}
                {/* <CFormCheck inline id="ssoChecked" label="로그인 정보 저장"/> */}
                <CFormLabel className="mb-5" style={{float: 'right'}}>
                    <a onClick={e => {
                        e.preventDefault();                
                        props.onChangePage("forgotUser");
                    }}
                    ><u className="underline">비밀번호를 잊으셨나요?</u>
                    </a>
                </CFormLabel>
            </CForm>

            {/* 버튼 */}
            <Button 
                onClick={conTest} 
                className="p-button" 
                variant="mb-3 p-1 px-3" 
                size="" >
                로그인
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();                
                props.onChangePage("signUp");
            }} 
                variant="mb-3 p-1 px-3" 
                size="" 
                className="s-button" >
                회원가입
            </Button>

            {/* 네이버 로그인 버튼 노출 영역 추가 */}
            <div>
                <div id="naver_id_login" style={{ display: 'none', marginTop: '20px' }}></div> 
                <Button 
                    id="naverLoginButton" 
                    variant="mb-3 p-1 px-3" 
                    style={{ borderRadius: '13px', borderWidth: '2px' }} 
                    onClick={handleLoginClick}
                >
                    <img src={loginButton} alt="네이버 로그인 이미지"></img>
                    네이버 로그인
                </Button>
            </div>
        </main>
    )
}

export default LoginPage;