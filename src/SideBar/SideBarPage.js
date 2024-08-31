import React, {useState} from "react";

import '../App.css';

import { COffcanvas, COffcanvasBody } from '@coreui/bootstrap-react'
import Button from 'react-bootstrap/Button';

import LoginPage from "../Login/LoginPage";
import SignUpPage from "../SignUp/SignUpPage";

const SideBarPage = (props) => {
  const [visible, setVisible] = useState(false);
  const [ renderPage, setRenderPage ] = useState(true);

  function onChangePage() {
    setRenderPage(!renderPage);
  }

  function onLogin() {
    props.onLogin();
  }

  return (
    <>
      <Button onClick={() => setVisible(true)} variant="outline-dark m-2 p-0 px-3" size="" className="b-button" style={{ borderRadius: '15px', borderWidth: '2px' }}>로그인</Button>
      <COffcanvas className="side-bar" placement="end" scroll={true} visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasBody>
          {renderPage === true ? <LoginPage onChangePage={onChangePage} onLogin={onLogin}/> : <SignUpPage onChangePage={onChangePage}/>}
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
};

export default SideBarPage;