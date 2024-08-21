import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoginPage(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log('login')
    return (
        <main className="login-page">
            <div className="login-logo"></div>
            <p>아이디</p>
            <p>비밀번호</p>
            <Button onClick={handleShow} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>로그인</Button>
            <Button onClick={function(e){
                e.preventDefault();
                props.onChangePage();
            }} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>회원가입</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>로그인 성공</Modal.Title>
                </Modal.Header>
                <Modal.Body>로그인 되었습니다</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default LoginPage;