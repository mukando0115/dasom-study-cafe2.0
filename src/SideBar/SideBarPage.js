import React, {useState} from "react";

import '../App.css';

import { COffcanvas } from '@coreui/bootstrap-react'
import { COffcanvasBody } from '@coreui/bootstrap-react'
import { COffcanvasHeader } from '@coreui/bootstrap-react'
import { COffcanvasTitle } from '@coreui/bootstrap-react'
import Button from 'react-bootstrap/Button';
import { CCloseButton } from '@coreui/bootstrap-react'

import LoginPage from "../Login/LoginPage";

const SideBarPage = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <Button onClick={() => setVisible(true)} variant="outline-dark m-2 p-0 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>로그인</Button>
        <COffcanvas placement="end" visible={visible} onHide={() => setVisible(false)}>
            <LoginPage/>
          {/* <COffcanvasHeader>
            <COffcanvasTitle>Offcanvas</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
          </COffcanvasHeader>
          <COffcanvasBody>
            Content for the offcanvas goes here. You can place just about any Bootstrap React component or
            custom elements here.
          </COffcanvasBody> */}
        </COffcanvas>
      </>
    )
};

export default SideBarPage;