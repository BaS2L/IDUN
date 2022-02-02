/***********************************
설명 : 연명부 페이지
************************************/

import React from "react";

function People(props) {
  return (
    <div className="People">
      <div className="main_container">
        <div className="cardHeader">
          <h2>연명부</h2>
        </div>
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR5cCgLExVZ_RMDX3TpD6nmhcs21a8subU8LWDIJ5gZkA9vqhDPRd1R9SJIrxneRiv3gjftalBVIfYi/pubhtml?gid=1426336818&amp;single=true&amp;widget=true&amp;headers=false"
          width="800"
          height="500"
        ></iframe>
      </div>
    </div>
  );
}

export default People;
