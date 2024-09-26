import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useState, useEffect } from 'react';
import api from '../api/api';

function ReservationInfo(props) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    
    //테이블에 출력될 예약 정보 변수 배열
    const [tableInfo, setTableInfo] = useState([]);  
    
    //삭제 요청할 예약 정보 변수
    const [reserveInfo, setReserveInfo] = useState({
        userId: userId,
        reserveDate: null,
        startTime: null,
        endTime: null,
        sitNum: '',
    })

    //예약 정보 불러오는 함수
    const getReservationInfo = () => {
        api.get(`reservation/${userId}`)
        .then(res => {
            alert('불러온 예약정보 setTableInfo에 push로 넣으면 됩니당')
        }).catch(e => {
            console.log(e);
        })
    }

    //'취소' 눌렀을 때 예약 삭제 요청하는 함수
    const reqDeleteReservation = () => {
        const deleteData = {
            userId: reserveInfo.userId,
            reserveDate: reserveInfo.reserveDate,
            startTime: reserveInfo.startTime,
            endTime: reserveInfo.endTime,
            sitNum: reserveInfo.sitNum,
        }
        api.post('reservation/deleteReservation', deleteData)
        .then(res => {
            window.location.reload();
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getReservationInfo();
    }, [userId]); // userId가 변경될 때마다 호출됩니다.

    return (
        <main className="reservationInfo-page">
            <p className="sub-title">ReservationInfo</p>
            <h1 className="main-title">예약 정보</h1>
            {isLoggedIn
                && <div className="reservation-table" style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">날짜</CTableHeaderCell>
                            <CTableHeaderCell scope="col">시간</CTableHeaderCell>
                            <CTableHeaderCell scope="col">좌석번호</CTableHeaderCell>
                            <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {(Array.isArray(tableInfo) && tableInfo.length === 0) 
                        ? <CTableRow>
                            <CTableDataCell colSpan="4">예약 정보가 없습니다</CTableDataCell>
                        </CTableRow> 
                        : {tableInfo}}
                    </CTableBody>
                </CTable>
            </div> 
            }                       
        </main>
    )
}

export default ReservationInfo;