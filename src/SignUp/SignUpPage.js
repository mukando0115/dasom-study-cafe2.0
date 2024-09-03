import { useState } from 'react';
import api from '../api/api';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale/ko";
import { 
    CButton, CForm, CFormFloating, CFormInput, CFormLabel, 
} from '@coreui/bootstrap-react'
import { PiSealCheckFill } from "react-icons/pi";

function SignUpPage(props) {
    const [show, setShow] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

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

    //input태그에서 pwCheck값 받아옴
    const getPwCheck = (e) => {
        setPwCheck(e.target.value);
    }

    //input태그에서 name값 받아옴
    const getName = (e) => {
        setName(e.target.value);
    }

    //input태그에서 phone값 받아옴
    const getPhone = (e) => {
        setPhone(e.target.value);
    }

    //서버로 보낼 로그인 데이터
    const data = {
        "user_id": id,
        "user_pw": pw,
        "user_name": name,
        "user_phone": phone,
        "user_birthDate": selectedDate
    };

    //회원가입 데이터 전송 함수(axios post)
    const reqSignUp = () => api.post('signUp', data)
    .then(res => {
        //중복 아닐 때
        if(res.data === false) {
            handleShow();        
        }
        //중복일 때
        else {
            alert('회원가입에 실패했습니다.');
        }
        console.log(res, data);
        
    }).catch(err => {
        alert("회원가입에 실패했습니다.");
        console.log(err);
    })

    //아이디 중복체크 전송 함수(axios get)
    const checkId = () => api.get(`signUp/${id}`)
    .then(res => {
        if(res.data === false) {
            alert("사용 가능한 아이디입니다.")
        }
        else {
            alert("사용 불가능한 아이디입니다.")
        }
    }).catch(err => {
        console.log(err);
    })

    return (
        <main className="signup-page">
            <div className="login-logo"></div>

            <CForm className="signup-form">

                {/* 아이디 입력 */}
                <CFormFloating className="mb-3">
                    <CFormInput type="id" id="floatingId" value={id} onChange={getId} placeholder="abcd1234" />
                    <CFormLabel htmlFor="floatingId">아이디입력 (6 - 20자)</CFormLabel>
                    <CButton onClick={checkId} className="p-button-sm mt-2" type="button">중복 확인</CButton>       
                </CFormFloating>

                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="password" id="floatingPassword" value={pw} onChange={getPw} placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호 입력(문자,숫자,특수문자 포함 8-20자)</CFormLabel>
                </CFormFloating>

                {/* 비밀번호 재입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="password" id="floatingPassword" value={pwCheck} onChange={getPwCheck} placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호 재입력</CFormLabel>
                </CFormFloating>

                {/* 이름 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="name" id="floatingPassword" value={name} onChange={getName} placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">이름 입력</CFormLabel>
                </CFormFloating>

                {/* 휴대폰번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput type="name" id="floatingPassword" value={phone} onChange={getPhone} placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">휴대폰 번호 입력 (“-” 제외 11자리 입력)</CFormLabel>
                </CFormFloating>

                {/* 생년월일 입력 */}
                <CFormFloating className="date-form">
                <DatePicker
                    locale={ko}
                    className="date-picker"
                    dateFormat='yyyy년 MM월 dd일' // 날짜 형태
                    placeholderText="생년월일 입력"
                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperProps={{
                        strategy: "fixed"
                      }}
                />
                </CFormFloating>

            </CForm>

            {/* 버튼 */}
            <Button onClick={reqSignUp} variant="mb-3 p-1 px-3" size="" className="s-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>
                회원가입
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();
                props.onChangePage("login");
            }} variant="mb-3 p-1 px-3" size="" className="p-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>
                이미 계정이 있으신가요? 로그인
            </Button>
        
            {/* 회원가입 성공 알림창 */}
            <Modal show={show} onHide={handleClose} centered>
                {/* <Modal.Header closeButton>
                <Modal.Title>로그인 성공</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="modal-body">
                    <PiSealCheckFill size={70}/>
                    <p>회원가입 되었습니다.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button className="p-button" variant="mb-3 p-1 px-3" onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default SignUpPage;