/***********************************
설명 : 사원관리 > 사원등록 Form
************************************/

import React, { useState } from "react";
import { db, authService } from "../../firebase";

import "./CSS/Mem_Add.css";

const Mem_Add = () => {
  const [mem_field, setMem_field] = useState("");
  const [mem_name, setMem_name] = useState("");
  const [mem_id, setMem_id] = useState("");
  const [mem_pw, setMem_pw] = useState("");
  const [mem_admin, setMem_admin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "memName") {
      setMem_name(value);
    } else if (name === "memField") {
      setMem_field(value);
    } else if (name === "memPw") {
      setMem_pw(value);
    } else if (name === "memId") {
      setMem_id(value);
    }
  };

  const adminCheck = (event) => {
    setMem_admin(!mem_admin);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const userObj = {
      이름: mem_name,
      현장: mem_field,
      사원번호: mem_id,
      권한: mem_admin,
    };
    await db.collection("members").doc(mem_name).set(userObj);
    setMem_id("");
    setMem_name("");
    setMem_pw("");
    setMem_field("");
    authService
      .createUserWithEmailAndPassword(mem_id + "@idun.com", mem_pw)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("이미 등록되어 있는 사원번호 입니다.");
        } else if (error.code === "auth/weak-password") {
          setError("비밀번호는 6글자 이상이어야 합니다.");
        }
      });
  };

  const toggleWrite = () => {
    setIsOpen((prev) => !prev);
    setMem_id("");
    setMem_name("");
    setMem_pw("");
    setMem_field("");
  };

  return (
    <div className="formDiv DownloadFactory">
      {isOpen ? (
        <form onSubmit={onSubmit} className="factoryForm">
          {error && <span className="error">{error}</span>}
          <div className="FactoryUI">
            <input
              className="input field"
              name="memField"
              type="text"
              value={mem_field}
              placeholder="현장"
              onChange={onChange}
            />
            <input
              className="input name"
              name="memName"
              type="text"
              value={mem_name}
              placeholder="이름"
              onChange={onChange}
              onKeyPress={(event) => {
                if (!/[ㄱ-ㅎ|가-힣]/.test(event.key)) {
                  event.preventDefault();
                  setError("한글만 입력하세요.");
                }
              }}
            />
            <input
              className="input id"
              name="memId"
              type="text"
              value={mem_id}
              placeholder="사원번호"
              onChange={onChange}
              pattern="[0-9]*"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                  setError("숫자만 입력하세요.");
                }
              }}
            />
            <input
              className="input pw"
              name="memPw"
              type="password"
              value={mem_pw}
              placeholder="비밀번호"
              onChange={onChange}
            />
            관리자
            <input
              id="admin_check"
              type="checkbox"
              onChange={adminCheck}
              checked={mem_admin}
            />
            <input type="submit" value="사원등록" onClick={onSubmit} />
            <button onClick={toggleWrite} className="Btn downSubmit">
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="toggleBtn" onClick={toggleWrite}>
          <span>사원 등록</span>
        </div>
      )}
    </div>
  );
};

export default Mem_Add;
