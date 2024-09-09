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

    const [form, setForm] = useState({
        id: '',
        pw: '',
        pwCheck: '',
        name: '',
        phone: '',
        selectedDate: null,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //서버로 보낼 회원가입 데이터
    const data = {
        "userId": form.id,
        "userPw": form.pw,
        "userName": form.name,
        "userPhone": form.phone,
        "userBirthDate": form.selectedDate
    };

    //회원가입 데이터 전송 함수(axios post)
    const reqSignUp = () => api.post('signUp', data)
    .then(res => {
        //회원가입 성공했을 때
        if(res.data.success) {
            handleShow();        
        }
        //실패했을 때
        else {
            alert('회원가입에 실패했습니다.');
        }
        console.log(res, data);
        
    }).catch(err => {
        alert(err.response.data.message);
        console.log(err);
    })

    //아이디 중복체크 전송 함수(axios get)
    const checkId = () => api.get(`signUp/${form.id}`)
    .then(res => {
        //사용 가능 아이디일 때
        if(res.data.success) {
            alert("사용 가능한 아이디입니다.");
        }
        //사용 불가능한 아이디일 때
        else {
            alert("사용 불가능한 아이디입니다.");
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
                    <CFormInput 
                        type="id" 
                        id="floatingId" 
                        value={form.id} 
                        onChange={e => setForm({...form, id: e.target.value})} 
                        placeholder="abcd1234" />
                    <CFormLabel htmlFor="floatingId">아이디입력 (6 - 20자)</CFormLabel>
                    <CButton 
                        onClick={checkId} 
                        className="p-button-sm mt-2" 
                        type="button">중복 확인</CButton>       
                </CFormFloating>

                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="password" 
                        id="floatingPassword" 
                        value={form.pw} 
                        onChange={e => setForm({...form, pw: e.target.value})} 
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호 입력(문자,숫자,특수문자 포함 8-20자)</CFormLabel>
                </CFormFloating>

                {/* 비밀번호 재입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="password" 
                        id="floatingPassword" 
                        value={form.pwCheck} 
                        onChange={e => setForm({...form, pwCheck: e.target.value})} 
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호 재입력</CFormLabel>
                </CFormFloating>

                {/* 이름 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="name" 
                        id="floatingPassword" 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">이름 입력</CFormLabel>
                </CFormFloating>

                {/* 휴대폰번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="name" 
                        id="floatingPassword" 
                        value={form.phone} 
                        onChange={e => setForm({...form, phone: e.target.value})} 
                        placeholder="password"/>
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
                    selected={form.selectedDate}
                    onChange={(date) => setForm({...form, selectedDate: date})}
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
            <Button 
                onClick={reqSignUp} 
                variant="mb-3 p-1 px-3" 
                size="" className="s-button" 
                style={{ borderRadius: '15px', borderWidth: '2px' }}>
                회원가입
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();
                props.onChangePage("login");
            }} 
                variant="mb-3 p-1 px-3" 
                size="" 
                className="p-button" 
                style={{ borderRadius: '15px', borderWidth: '2px' }}>
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
                <Button 
                    className="p-button" 
                    variant="mb-3 p-1 px-3" 
                    onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default SignUpPage;