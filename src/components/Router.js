/***********************************
설명 : 경로 설정
************************************/

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "../firebase";
import Statement from "./users/Statement";
import Download from "./users/Download";
import Home from "./Router/Home";
import People from "./users/People";
import Report from "./users/Report";
import Signin from "./Router/SignIn";
import Mem_reg from "./Admin/Mem_reg";

import "../css/main.css";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, id }) => {
  const [nowMem, setNowMem] = useState([]);
  const [isAdmin, setIsAdmin] = useState();

  /***********************************
설명 : 현재 로그인한 계정 db정보 검색
************************************/
  useEffect(() => {
    db.collection("members")
      .where("사원번호", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNowMem(doc.data());
        });
      });
  }, []);

  /***********************************
설명 : 현재 로그인한 계정 권한 확인
************************************/
  useEffect(() => {
    if (nowMem.권한 === true) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  });

  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation isAdmin={isAdmin} isLoggedIn={isLoggedIn} />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/statement"
              element={<Statement nowMem={nowMem} />}
            />
            <Route
              exact
              path="/download"
              element={<Download isAdmin={isAdmin} />}
            />
            <Route exact path="/people" element={<People />} />
            <Route exact path="/report" element={<Report />} />
            <Route
              exact
              path="/admin"
              element={<Mem_reg isAdmin={isAdmin} />}
            />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Signin />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
