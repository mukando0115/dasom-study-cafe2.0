import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { 
    CButton, CForm, CFormFloating, CFormInput, CFormLabel, 
    CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, 
    CContainer, CRow, CCol,
    CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody
} from '@coreui/bootstrap-react'

function SignUpPage(props) {
    const [show, setShow] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

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

    return (
        <main className="signup-page">
            <div className="login-logo"></div>

            <CForm className="signup-form">

                {/* 아이디 입력 */}
                <CFormFloating className="mb-3">
                    <CFormInput type="id" id="floatingId" value={id} onChange={getId} placeholder="abcd1234" />
                    <CFormLabel htmlFor="floatingId">아이디입력 (6 - 20자)</CFormLabel>
                    <CButton type="button">중복 확인</CButton>                
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
                <CContainer className="mb-3">
                    <CRow className="justify-content-between">
                        <CCol xs={3} className="p-0">
                            <CDropdown>
                                <CDropdownToggle color={'light'} size="lg">년도</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem as="button">2024</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">2023</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">2022</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol xs={3} className="m-0">
                            <CDropdown>
                                <CDropdownToggle color={'light'} size="lg">월</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem as="button">1</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">2</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">3</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol xs={3} className="m-0">
                            <CDropdown>
                                <CDropdownToggle color={'light'} size="lg">일</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem as="button">1</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">2</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem as="button">3</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CContainer>

               <CAccordion flush>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>이용약관 확인</CAccordionHeader>
                        <CAccordionBody>
                            <strong>
                                총칙
                            </strong>
                        </CAccordionBody>
                    </CAccordionItem>                
                </CAccordion> 
            </CForm>

            {/* 버튼 */}
            <Button onClick={handleShow} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>
                회원가입
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();
                props.onChangePage();
            }} variant="outline-dark m-3 p-1 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>
                이미 계정이 있으신가요? 로그인
            </Button>
        
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