/***********************************
설명 : 급여명세서 div
************************************/

import React from "react";
import Axios from "axios";
import file_api from "js-file-download";

const StatementView = ({ val, StaUrl }) => {
  const downURL = StaUrl.replace("https://firebasestorage.googleapis.com/", "");
  const downAction = (e) => {
    e.preventDefault();
    Axios({
      url: `/${downURL}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      file_api(response.data, val);
    });
  };

  return (
    <div className="formDiv StaView">
      <h2 onClick={downAction}>{val}</h2>
    </div>
  );
};

export default StatementView;
