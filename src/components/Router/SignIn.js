/***********************************
설명 : 로그인화면
************************************/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../firebase";
import "../../css/Signin.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function SignIn() {
  const navigate = useNavigate();
  const [mem_id, setMem_id] = useState("");
  const [mem_pw, setMem_pw] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "mem_id") {
      setMem_id(value);
    } else if (name === "mem_pw") {
      setMem_pw(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await authService
      .signInWithEmailAndPassword(mem_id + "@idun.com", mem_pw)
      .then(navigate("/"))
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError(
            "사원번호 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 사원번호 입니다."
          );
        }
        if (error.code === "auth/wrong-password") {
          setError(
            "사원번호 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 사원번호 입니다."
          );
        }
      });
  };

  return (
    <div className="Signin">
      <div className="content">
        <form onSubmit={onSubmit} onChange={onChange}>
          <div className="header">
            <h1>IDUN - ManageMent System</h1>
          </div>

          <div className="field">
            <span>
              <AccountBoxIcon />
            </span>
            <input
              className="input id"
              type="text"
              defaultValue={mem_id}
              required
              name="mem_id"
              pattern="[0-9]*"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                  setError("숫자만 입력하세요");
                }
              }}
            />
            <label>{mem_id ? "" : "사원번호"}</label>
          </div>
          <div className="field">
            <span>
              <LockIcon />
            </span>
            <input
              className="input pw"
              type="password"
              defaultValue={mem_pw}
              required
              name="mem_pw"
            />
            <label>{mem_pw ? "" : "비밀번호"}</label>
          </div>
          <span className="err">{error}</span>
          <button className="Btn submitBtn" onSubmit={onSubmit}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
