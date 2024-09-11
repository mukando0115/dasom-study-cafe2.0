import { 
    CContainer, 
    CRow, 
    CCol, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem, 
    CButton, 
    CCollapse,
    CCard,
    CCardBody,
    CForm,
    CFormInput,
    CButtonGroup,
    CFormCheck,
} from '@coreui/react'
import React, { useState } from "react";

function ReservationPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [visible, setVisible] = useState(false);

    //예약 정보
    const [form, setForm] = useState({
        userId: userId,
        reserveDate: null,
        startTime: null,
        endTime: null,
        sitNum: '',
    });
    //좌석타입 별 개수
    const sitCount = {
        "common": 20,
        "private": 17,
        "fixed": 11,
    };
    //예약권 선택 - 시간 충전권 | 고정석 기간권
    const [ticketType, setTicketType] = useState('');
    const [ticketMenu, setTicketMenu] = useState('예약권 선택');
    //좌석 선택 - 1인실 (Common) | 1인실 (Private) | 고정석
    const [sitType, setSitType] = useState('');
    const [sitMenu, setsitMenu] = useState('좌석 선택');
    const [sitNum, setSitNum] = useState(0);

    return (
        <main className="resercation-page">
            {isLoggedIn === "1" && 
            <div>
                <p className="sub-title">Reservation</p>
                <h1 className="main-title">예약하기</h1>
                <div>
                    <CContainer className="reservation-form">
                        <CRow lg={{ cols: 2, gutter: 3}}>
                            <CCol>
                                <div>
                                    <h4>예약권 선택</h4>
                                    <CDropdown>
                                        <CDropdownToggle>{ticketMenu}</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem 
                                                as="button" 
                                                onClick={(e) => {
                                                    setTicketType('time')
                                                    setTicketMenu('시간 충전권')
                                                    setsitMenu('좌석 선택')
                                                    setSitType('')
                                                }}>시간 충전권
                                            </CDropdownItem>
                                            <CDropdownItem 
                                                as="button"
                                                onClick={(e) => {
                                                    setTicketType('term')
                                                    setTicketMenu('고정석 기간권')
                                                    setsitMenu('좌석 선택')
                                                    setSitType('')
                                                }}>고정석 기간권
                                            </CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>
                                <hr/>
                                <div>
                                    <h4>좌석 선택</h4>
                                    <CDropdown>
                                        <CDropdownToggle>{sitMenu}</CDropdownToggle>
                                        {/* 시간 충전권 드롭메뉴 */}
                                        {ticketType === 'time' &&
                                            <div>
                                                <CDropdownMenu>                                            
                                                    <CDropdownItem 
                                                        as="button" 
                                                        onClick={(e) => {
                                                            setSitType('common')
                                                            setsitMenu('1인실 (Common)')
                                                        }}>1인실 (Common)</CDropdownItem>
                                                    <CDropdownItem 
                                                        as="button" 
                                                        onClick={(e) => {
                                                            setSitType('private')
                                                            setsitMenu('1인실 (Private)')
                                                        }}>1인실 (Private)</CDropdownItem>
                                                </CDropdownMenu>                                                                       
                                            </div>                     
                                        }                                        
                                        {/* 고정석 기간권 드롭메뉴 */}
                                        {ticketType === 'term' && 
                                            <div>
                                                <CDropdownMenu>                                            
                                                    <CDropdownItem 
                                                        as="button"
                                                        onClick={(e) => {
                                                            setSitType('fixed')
                                                            setsitMenu('고정석')
                                                        }}>고정석</CDropdownItem>
                                                </CDropdownMenu>
                                            </div>            
                                        }
                                        {/* 좌석 번호 드롭메뉴 */}
                                        <CDropdown>
                                            <CDropdownToggle>좌석 번호</CDropdownToggle>
                                            {sitType === 'common' ? <>common</>
                                            : sitType === 'private' ? <>private</>
                                            : sitType === 'fixed' ? <>fixed</>
                                            : <></>
                                            }
                                            <CDropdownMenu>
                                            </CDropdownMenu>
                                        </CDropdown>    
                                    </CDropdown>
                                </div>
                                <hr/>                                
                                <div>
                                    <h4>예약일 선택</h4>
                                </div>
                                <hr/>
                                <div>
                                    <h4>사용 시작 시간 선택</h4>
                                    <CDropdown>
                                        <CDropdownToggle>
                                            <CDropdownMenu>
                                                
                                            </CDropdownMenu>
                                        </CDropdownToggle>
                                    </CDropdown>
                                </div>
                                <hr/>
                                <div>
                                    <h4>사용 종료 시간 선택</h4>
                                </div>
                                <hr/>
                                <div>
                                    <CButton 
                                        className="p-button"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setVisible(!visible)
                                        }}>
                                        예약진행
                                    </CButton>
                                </div>
                            </CCol>

                            <CCol>
                                <div>
                                    <CCollapse visible={visible} horizontal>
                                        <CCard style={{ width: '300px' }}>
                                            <CCardBody>
                                                <CForm>
                                                <h2>예약 정보 확인</h2>
                                                <span>이용권 정보</span>
                                                <CFormInput type="text" placeholder={ticketMenu} readOnly/>
                                                <span>이용 예정 날짜</span>
                                                <CFormInput type="text" placeholder="2024.08.27" readOnly/>
                                                <span>이용 예정 시간</span>
                                                <CFormInput type="text" placeholder="1:00 PM ~ 3:00 PM" readOnly/>
                                                <span>좌석 정보</span>
                                                <CFormInput type="text" placeholder={"1번 | "+sitMenu} readOnly/>
                                                <CButton 
                                                    className="s-button mt-3"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setVisible(false)
                                                    }}
                                                    >취소</CButton>
                                                <CButton className="p-button">결제 진행</CButton>
                                                </CForm>
                                            </CCardBody>
                                        </CCard>
                                    </CCollapse>
                                </div>                                
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </div>
            }
        </main>
    )
}

export default ReservationPage;