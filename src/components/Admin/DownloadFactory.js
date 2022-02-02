/**************************************
설명 : 자료실 > 다운로드 글쓰기 Action
***************************************/

import React, { useState } from "react";
import { db, storageService, firebaseInstance } from "../../firebase";

import "./CSS/DownloadFactory.css";

const DownloadFactory = () => {
  const [downTitle, setDownTitle] = useState("");
  const [downText, setDownText] = useState("");
  const [downFile, setDownFile] = useState("");
  const [downFileName, setDownFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleWrite = () => {
    setIsOpen((prev) => !prev);
    setDownTitle("");
    setDownText("");
    setDownFile("");
    setDownFileName("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (downTitle === "") {
      alert("제목은 필수값 입니다.");
      return;
    }
    let downFileUrl = "";
    if (downFile !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`download/${downFileName}`);
      const response = await attachmentRef.putString(downFile, "data_url");
      downFileUrl = await response.ref.getDownloadURL();
    }
    const downObj = {
      title: downTitle,
      text: downText,
      createdAt: firebaseInstance.firestore.FieldValue.serverTimestamp(),
      downFileUrl,
      downFileName: downFileName,
    };
    await db.collection("download").add(downObj);
    toggleWrite();
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "downTitle") {
      setDownTitle(value);
    } else if (name === "downText") {
      setDownText(value);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setDownFile(result);
      setDownFileName(theFile.name);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  return (
    <div className="formDiv DownloadFactory">
      {isOpen ? (
        <form onSubmit={onSubmit} className="factoryForm">
          <div className="FactoryUI">
            <div className="DownInput">
              <input
                className="input title"
                name="downTitle"
                type="text"
                value={downTitle}
                onChange={onChange}
              />
              {downTitle ? "" : <label>제목</label>}
            </div>
            <div className="DownInput">
              <input
                className="input text"
                name="downText"
                type="textarea"
                value={downText}
                onChange={onChange}
              />
              {downText ? "" : <label>내용</label>}
            </div>
            <input id="downFile" type="file" multiple onChange={onFileChange} />
            <div className="Option">
              <button onSubmit={onSubmit} className="Btn downSubmit">
                등록
              </button>
              <button onClick={toggleWrite} className="Btn downCancle">
                취소
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="toggleBtn" onClick={toggleWrite}>
          <span>작성</span>
        </div>
      )}
    </div>
  );
};

export default DownloadFactory;
