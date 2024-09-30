import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useState, useEffect } from 'react';
import api from '../api/api';

function ReservationInfo(props) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    
    const [tableInfo, setTableInfo] = useState([]);  

    // 삭제 요청할 예약 정보 변수
    const [reserveInfo, setReserveInfo] = useState({
        userId: userId,
        reserveDate: null,
        startTime: null,
        endTime: null,
        sitNum: '',
    });

    const getReservationInfo = () => {
        api.get(`reservationInfo/${userId}`)
        .then(res => {
            setTableInfo(res.data);  
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const reqDeleteReservation = (deleteData) => {
        api.post(`reservationInfo/cancel`, { deleteData })
        .then(res => {
            alert('예약이 성공적으로 취소되었습니다.');
            getReservationInfo();
        })
        .catch(e => {
            console.error("Error during deletion:", e);
            alert("예약 취소에 실패했습니다. 서버에 문의하세요.");
        });
    };

    const handleCancel = (info) => {
        const formattedDeleteData = {
            userId: userId,
            // reserveDate: new Date(info.reserveDate).toISOString().split('T')[0], // 'YYYY-MM-DD' 포맷으로 변환
            reserveDate: new Date(info.reserveDate).toLocaleDateString('sv-SE'),
            startTime: new Date(info.startTime).toLocaleString('sv-SE'), // 'YYYY-MM-DD HH:MM:SS' 포맷으로 변환
            endTime: new Date(info.endTime).toLocaleString('sv-SE'), // 'YYYY-MM-DD HH:MM:SS' 포맷으로 변환
            sitNum: info.sitNum,
        };

        // 예약 정보 설정 후 취소 요청
        setReserveInfo(formattedDeleteData);
        reqDeleteReservation(formattedDeleteData); // 형식이 바뀐 예약 정보 기반으로 삭제 요청
    };

    useEffect(() => {
        getReservationInfo();
    }, [userId]);

    return (
        <main className="reservationInfo-page">
            <p className="sub-title" style={{textAlign: 'left'}}>예약 정보</p>
            {isLoggedIn && (
                <div className="reservation-table" style={{overflowY: 'auto', scrollbarWidth: 'none', maxHeight: '400px', width: '100%', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">구분</CTableHeaderCell>
                                <CTableHeaderCell scope="col">날짜</CTableHeaderCell>
                                <CTableHeaderCell scope="col">사용 시간</CTableHeaderCell>
                                <CTableHeaderCell scope="col">좌석번호</CTableHeaderCell>
                                <CTableHeaderCell scope="col">좌석 유형</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {(Array.isArray(tableInfo) && tableInfo.length === 0) 
                            ? <CTableRow>
                                <CTableDataCell colSpan="6">예약 정보가 없습니다</CTableDataCell>
                            </CTableRow> 
                            : tableInfo.map((info, index) => (  
                                <CTableRow key={index}>
                                    <CTableDataCell>{index+1}</CTableDataCell>
                                    <CTableDataCell>{new Date(info.reserveDate).toLocaleDateString('sv-SE')}</CTableDataCell>
                                    <CTableDataCell>
                                        {new Date(info.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(info.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </CTableDataCell>
                                    <CTableDataCell>{info.sitNum}번</CTableDataCell>
                                    <CTableDataCell>{(info.sitNum >= 1 && info.sitNum <= 20) ? `1인실(Common)`
                                    : (info.sitNum >= 21 && info.sitNum <= 31) ? `고정석`
                                    : (info.sitNum >= 32 && info.sitNum <= 48) ? `1인실(Private)`
                                    : ''                                
                                }</CTableDataCell>
                                    <CTableDataCell>
                                        <button onClick={() => handleCancel(info)}>
                                            취소
                                        </button>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
            )}
        </main>
    );
}

export default ReservationInfo;