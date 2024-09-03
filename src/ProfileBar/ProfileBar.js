import { FaUserCircle } from "react-icons/fa";
import { CPopover, CButton } from '@coreui/react'

function ProfileBarPage(props) {

    const logoutButton = <CButton className="p-button" 
        onClick={() => {
            console.log('dd');
            alert(localStorage.getItem("id")+'가 로그아웃 되었습니다.')
            props.onLogout();
        }}>로그아웃</CButton>

    return (
        <main className="profile-page">            

            <CPopover
                content={logoutButton}
                placement="bottom"
                title="내 정보"
                trigger="focus"
            >
                <CButton><FaUserCircle size={30}>안</FaUserCircle></CButton>
            </CPopover>
        </main>
    )
}

export default ProfileBarPage;