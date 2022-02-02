/***********************************
설명 : 왼쪽 메뉴
************************************/

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authService } from "../firebase";

import "../css/Navigation.css";

import logo from "../assets/logo.png";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function Navigation({ isAdmin, isLoggedIn }) {
  const navigate = useNavigate();

  /***********************************
설명 : 로그아웃 Action
************************************/
  const SignOut = () => {
    authService.signOut().then(alert("로그아웃"));
    navigate("/");
  };

  return (
    <div className="Navigation">
      <ul>
        <Link to="/">
          <span className="logo">
            <img src={logo} />
          </span>
        </Link>
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <li>
                <NavLink to="/admin">
                  <span className="icon">
                    <HowToRegIcon style={{ fontSize: "1.75em" }} />
                  </span>
                  <span className="title">사원관리</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/download">
                <span className="icon">
                  <CloudUploadOutlinedIcon style={{ fontSize: "1.75em" }} />
                </span>
                <span className="title">자료실</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/people">
                <span className="icon">
                  <AssignmentIndOutlinedIcon style={{ fontSize: "1.75em" }} />
                </span>
                <span className="title">연명부</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/report">
                <span className="icon">
                  <SummarizeOutlinedIcon style={{ fontSize: "1.75em" }} />
                </span>
                <span className="title">사직서 / 사유서</span>
              </NavLink>
            </li>
            {isAdmin ? (
              ""
            ) : (
              <>
                <li>
                  <NavLink to="/statement">
                    <span className="icon">
                      <DescriptionOutlinedIcon style={{ fontSize: "1.75em" }} />
                    </span>
                    <span className="title">급여명세서 확인</span>
                  </NavLink>
                </li>
              </>
            )}

            <li onClick={SignOut} className="logout">
              <NavLink to="/logout">
                <span className="icon">
                  <LogoutOutlinedIcon style={{ fontSize: "1.75em" }} />
                </span>
                <span className="title">로그아웃</span>
              </NavLink>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default Navigation;
