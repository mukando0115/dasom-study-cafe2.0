import React, {useState} from "react";

import '../App.css';

import { COffcanvas } from '@coreui/bootstrap-react'
import Button from 'react-bootstrap/Button';

import LoginPage from "../Login/LoginPage";

const SideBarPage = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <Button onClick={() => setVisible(true)} variant="outline-dark m-2 p-0 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>로그인</Button>
        <COffcanvas placement="end" visible={visible} onHide={() => setVisible(false)}>
            <LoginPage/>
        </COffcanvas>
      </>
    )
};

export default SideBarPage;