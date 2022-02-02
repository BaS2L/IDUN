/***********************************
설명 : 사직서/사유서 페이지
************************************/

import React from "react";

function Report() {
  return (
    <div className="Report">
      <div className="main_container">
        <div className="cardHeader">
          <h2>사직서/사유서</h2>
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScBRvGJHBEb-j2auddgTEprHuAqXcSIXuFFr4ekdQcksH4JLA/viewform?embedded=true"
          width="900"
          height="1600"
        ></iframe>
      </div>
    </div>
  );
}

export default Report;
