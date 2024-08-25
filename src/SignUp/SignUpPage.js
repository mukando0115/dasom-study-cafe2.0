import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SignUpPage(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <main className="signup-page">
            <p>회원가입 페이지</p>
            <p>아이디입력</p>
            <p>비밀번호 입력</p>
            <p>이름 입력</p>
            <p>휴대폰 번호 입력</p>
            <Button onClick={handleShow} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>회원가입</Button>
            <Button onClick={function(e){
                e.preventDefault();
                props.onChangePage();
            }} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>이미 계정이 있으신가요? 로그인</Button>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>회원가입 성공</Modal.Title>
                </Modal.Header>
                <Modal.Body>회원가입 되었습니다</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default SignUpPage;