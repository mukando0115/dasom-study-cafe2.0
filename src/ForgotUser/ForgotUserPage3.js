import {
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CButton,
} from "@coreui/react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import api from '../api/api';


function ProfileBarPage(props) {
  const [activeTab, setActiveTab] = useState(1);
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [showNewPasswordInputs, setShowNewPasswordInputs] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function findConfirm() {
    let data = {};
    let url = "";
    //id찾기 유효성 검사
    if(activeTab === 1) {
      handleFindIdConfirmClick();
    }
    //pw찾기 유효성 검사
    else if(activeTab === 2) {
      handleConfirmClick();
    }
    //id찾기 탭&유효성 통과했을 때
    if(activeTab === 1 && handleFindIdConfirmClick) {
      data = {
      "userBirthDate": birthdate,
      "userPhone": phoneNumber
      };
      url = "findId";
      console.log('find id', data);
      conTest(url, data);
    }
    //pw찾기 탭&유효성 통과했을 때
    else if(activeTab === 2 && handleConfirmClick) {
      data = {
      "userId": userId,
      "userPhone": phoneNumber
      };
      url = "findPw";
      console.log('find pw', data);
      conTest(url, data);
    }
  }

 
  //id 찾기 유효성 검사
  const handleFindIdConfirmClick = () => {
    if (birthdate.length === 8 && phoneNumber.length >= 10) {
      //setActiveTab(15);
      return true
    } else {
      alert("생년월일 8자리와 유효한 핸드폰 번호를 입력해 주세요.");
      return false
    }
  };
  

  const handleNumericInput = (e) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };


  //pw 찾기 유효성 검사
  const handleConfirmClick = () => {
    if (userId && phoneNumber) {
      //setShowNewPasswordInputs(true);
      return true
    } else {
      alert("아이디와 핸드폰 번호를 입력해 주세요.");
      return false
    }
  };

  const conTest = (url, data) => api.post(url, data)
  .then((res) => {
    //찾기 성공했을때
    if(res.data.success) {
      alert("전송 성공~ 이제 activeTab값에 따라서 res.data 출력하시면 됩니당");
    }
    //찾기 실패했을때
    else{
      alert(res.data.message);
    }
  }).catch((err) => {
      alert(err.response.data.message);
      console.log(err);
  })


  const handleNewPasswordConfirmClick = () => {
    if (newPassword === confirmPassword) {
      alert("새 비밀번호가 설정되었습니다.");
    } else {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="forgotuser-page" style={styles.main}>
      <CTabs 
        activeItemKey={activeTab} 
        onChange={(key) => {
          setBirthdate("");
          setPhoneNumber("");
          setUserId("");
          setActiveTab(key);
          }}>
        <CTabList variant="underline">
          <CTab aria-controls="home-tab-pane" itemKey={1}>
            아이디 찾기
          </CTab>
          <CTab aria-controls="profile-tab-pane" itemKey={2}>
            비밀번호 찾기
          </CTab>
        </CTabList>

        <CTabContent>
          <CTabPanel
            className="py-3"
            aria-labelledby="home-tab-pane"
            itemKey={1}
            style={styles.tabPanel}
          >
            <div style={styles.inputGroup}>
              <label style={styles.label}>생년월일 8자리</label>
              <input
                type="text"
                placeholder="ex: 19900101"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                onKeyDown={handleNumericInput}
                maxLength={8}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>핸드폰 번호 입력('-'제외)</label>
              <input
                type="text"
                placeholder="ex: 01012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyDown={handleNumericInput}
                maxLength={11}
                style={styles.input}
              />
            </div>
           
          </CTabPanel>

          <CTabPanel
            className="py-3"
            aria-labelledby="profile-tab-pane"
            itemKey={2}
            style={styles.tabPanel}
          >
            {!showNewPasswordInputs ? (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>아이디 입력</label>
                  <input
                    type="text"
                    placeholder="아이디 입력"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>핸드폰 번호 입력('-'제외)</label>
                  <input
                    type="text"
                    placeholder="ex: 01012345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyDown={handleNumericInput}
                    maxLength={11}
                    style={styles.input}
                  />
                </div>
               
              </>
            ) : (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>새 비밀번호 입력</label>
                  <input
                    type="password"
                    placeholder="새 비밀번호 입력"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>새 비밀번호 확인</label>
                  <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />
                </div>
                {passwordError && (
                  <p style={styles.errorText}>{passwordError}</p>
                )}
                <CButton
                  className="p-button"
                  style={styles.button}
                  onClick={handleNewPasswordConfirmClick}
                >
                  비밀번호 설정
                </CButton>
              </>
            )}
          </CTabPanel>

          <Button 
              onClick={findConfirm} 
              className="p-button" 
              variant="mb-3 p-1 px-3" 
              size="" 
              style={{ borderRadius: '13px', borderWidth: '2px' }}>
              확인
          </Button>
          <Button onClick={(findConfirm) => {
              findConfirm.preventDefault();                
              props.onChangePage("signUp");
          }} 
              variant="mb-3 p-1 px-3" 
              size="" 
              className="s-button" 
              style={{ borderRadius: '13px', borderWidth: '2px' }}>
              로그인
          </Button>
        </CTabContent>
      </CTabs>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  tabPanel: {
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "border-color 0.3s",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  loginLink: {
    marginTop: "15px",
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    borderRadius: "4px",
    border: "1px solid #007bff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default ProfileBarPage;
