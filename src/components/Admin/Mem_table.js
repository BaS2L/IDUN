/***********************************
설명 : 사원관리 테이블
************************************/

import React, { useState } from "react";
import { db, storageService } from "../../firebase";
const Mem_table = ({ mem }) => {
  const [attachment, setAttachment] = useState("");

  const memdb = db.collection("members").doc(mem.이름);
  const ref = storageService.ref();

  /***********************************
설명 : 오늘 날짜 가져옴
************************************/
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(theFile.type);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ref
      .child(
        `급여명세서/${mem.이름}/${mem.이름}(${mem.사원번호})님 ${year}년${month}월 급여명세서`
      )
      .putString(attachment, "data_url")
      .then((snapshot) => {
        alert("전송 완료");
        setAttachment("");
      });
  };

  const onDel = () => {
    memdb.delete();
    ref.listAll().then((listResults) => {
      const promises = listResults.items.map((item) => {
        return item.delete();
      });
      Promise.all(promises);
    });
  };

  const cancle = () => {
    setAttachment("");
  };

  return (
    <tr>
      <td>{mem.이름}</td>
      <td>{mem.사원번호}</td>
      <td>{mem.현장}</td>

      {mem.권한 ? (
        ""
      ) : (
        <>
          <td>
            <form onSubmit={onSubmit}>
              <input type="file" onChange={onFileChange} />
              <button onClick={cancle}>취소</button>
              <input type="submit" value="발송" />
            </form>
          </td>
          <td>
            <button onClick={onDel}>제거</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Mem_table;
