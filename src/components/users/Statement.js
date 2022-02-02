/***********************************
설명 : 급여명세서 페이지
************************************/

import React, { useState } from "react";
import { storageService } from "../../firebase";
import StatementView from "./StatementView";

import "../../css/Statement.css";

function Statement({ nowMem }) {
  const [StaUrl, setStaUrl] = useState("");
  const [StaArray, setStaArray] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const listItem = () => {
    storageService
      .ref()
      .child(`급여명세서/${nowMem.이름}`)
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((item) => {
          item.getDownloadURL().then((url) => {
            setStaUrl(url);
          });
          setStaArray((arr) => [...arr, item.name]);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
    setIsSearch((prev) => !prev);
  };

  return (
    <div className="Statement">
      <div className="main_container">
        <div className="cardHeader">
          <h2>급여명세서</h2>
        </div>

        <div className="formDiv staSearch">
          {isSearch ? (
            <div className="toggleBtn">
              {StaArray.length}개의 급여명세서가 조회되었습니다.
            </div>
          ) : (
            <div className="toggleBtn" onClick={listItem}>
              급여명세서 조회
            </div>
          )}
        </div>

        {StaArray.map((val) => (
          <>
            {val ? (
              <>
                <StatementView val={val} nowMem={nowMem} StaUrl={StaUrl} />
              </>
            ) : (
              "조회된 급여명세서가 없습니다."
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Statement;
