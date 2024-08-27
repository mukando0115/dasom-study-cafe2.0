import { CDropdown , CDropdownMenu, CDropdownToggle, CListGroup, CListGroupItem } from '@coreui/react'

function ReservationPage() {
    return (
        <main className="resercation-page">
            <p className="sub-title">Reservation</p>
            <h1 className="main-title">예약하기</h1>
            <div>
            <CDropdown>
                <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                <CDropdownMenu>
                {['', '-sm', '-md', '-lg', '-xl', '-xxl'].map((breakpoint, index) => (
                    <CListGroup className="mb-2" layout={`horizontal${breakpoint}`} key={index}>
                    <CListGroupItem as="button">1</CListGroupItem>
                    <CListGroupItem as="button">10</CListGroupItem>
                    <CListGroupItem as="button">AM</CListGroupItem>
                    </CListGroup>
                ))}
                </CDropdownMenu>
            </CDropdown>
            </div>
        </main>
    )
}

export default ReservationPage;