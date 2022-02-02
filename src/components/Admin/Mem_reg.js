/***********************************
설명 : 사원관리 > 사원등록 Action
************************************/

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "../../css/Mem_reg.css";
import Mem_table from "./Mem_table";
import Mem_Add from "./Mem_Add";
function Mem_reg({ isAdmin }) {
  const [mems, setMems] = useState([]);

  useEffect(() => {
    db.collection("members")
      .orderBy("사원번호", "desc")
      .onSnapshot((snapshot) => {
        const memArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMems(memArray);
      });
  }, []);

  return (
    <div className="Mem_reg">
      <div className="main_container">
        {isAdmin ? (
          <>
            <div className="cardHeader">
              <h2>사원 관리</h2>
            </div>
            <Mem_Add />
            <div className="mem_view">
              <table>
                <thead>
                  <tr>
                    <td>이름</td>
                    <td>사원번호</td>
                    <td>현장</td>
                    <td>급여명세서 발송</td>
                    <td>제거</td>
                  </tr>
                </thead>
                <tbody>
                  {mems.map((mem) => (
                    <Mem_table key={mem.사원번호} mem={mem} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          "잘못된 접근입니다."
        )}
      </div>
    </div>
  );
}

export default Mem_reg;
