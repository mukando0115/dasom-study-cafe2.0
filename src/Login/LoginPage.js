import { useState } from 'react';
import api from '../api/api';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CForm, CFormFloating, CFormInput, CFormLabel, CFormCheck } from '@coreui/bootstrap-react'
import { PiSealCheckFill } from "react-icons/pi";

function LoginPage(props) {
    const [show, setShow] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //input태그에서 id값 받아옴
    const getId = (e) => {
        setId(e.target.value);
    }

    //input태그에서 pw값 받아옴
    const getPw = (e) => {
        setPw(e.target.value);
    }

    //서버로 보낼 로그인 데이터
    const data = {
        "id": id,
        "pw": pw
    };
    
    //서버 전송 함수(axios post)
    const conTest = () => api.post('login', data)
    .then((res) => {
        //로그인 성공했을 때
        if(res.data === true) {            
            localStorage.setItem("id", id);
            console.log(res, data);
            handleShow();
            props.onLogin();
        }
        //로그인 실패했을 때
        else{
            alert('로그인에 실패했습니다');
        }
    }).catch((err) => {
        console.log(err);
    })
    
    //화면부
    return (
        <main className="login-page">
            <div className="login-logo"></div>

            <CForm className="login-form">

                {/* 아이디 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="id" id="floatingId" value={id} onChange={getId} placeholder="abcd1234"/>
                    <CFormLabel htmlFor="floatingId">아이디</CFormLabel>
                </CFormFloating>

                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="password" id="floatingPassword" value={pw} onChange={getPw} placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                </CFormFloating>

                {/* 로그인 정보 저장 & 비밀번호 찾기 */}
                <CFormCheck inline id="ssoChecked" label="로그인 정보 저장"/>
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
            <Button onClick={conTest} className="p-button" variant="mb-3 p-1 px-3" size="" style={{ borderRadius: '13px', borderWidth: '2px' }}>
                로그인
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();                
                props.onChangePage("signUp");
            }} variant="mb-3 p-1 px-3" size="" className="s-button" style={{ borderRadius: '13px', borderWidth: '2px' }}>
                회원가입
            </Button>

            {/* 로그인 성공 알림창 */}
            <Modal show={show} onHide={handleClose} centered>
                {/* <Modal.Header closeButton>
                <Modal.Title>로그인 성공</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="modal-body">
                    <PiSealCheckFill size={70}/>
                    <p>로그인 되었습니다.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button className="p-button" variant="mb-3 p-1 px-3" onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default LoginPage;