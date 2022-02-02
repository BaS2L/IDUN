/***********************************
설명 : 자료실
************************************/

import React, { useState, useEffect } from "react";
import DownloadFactory from "../Admin/DownloadFactory";
import { db } from "../../firebase";
import "../../css/Download.css";
import DownView from "./DownView";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Moment from "react-moment";
import "moment/locale/ko";

function Download({ isAdmin }) {
  const [downs, setDowns] = useState([]);

  useEffect(() => {
    db.collection("download")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const downArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDowns(downArray);
      });
  }, []);

  return (
    <div className="Download">
      <div className="main_container">
        <div className="cardHeader">
          <h2>자료실</h2>
        </div>
        {isAdmin && (
          <div className="down">
            <DownloadFactory />
          </div>
        )}
        <br />
        <div className="today">
          <CalendarTodayIcon style={{ fontSize: "12px" }} />
          오늘, <Moment format="LLLL" />
        </div>
        {downs.map((down) => (
          <DownView key={down.id} down={down} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

export default Download;
