/***********************************
설명 : 게시물 div
************************************/

import React, { useState } from "react";
import Axios from "axios";
import file_api from "js-file-download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { db, storageService } from "../../firebase";
import Moment from "react-moment";
import "moment/locale/ko";
import { DownloadOutlined } from "@mui/icons-material";
const DownView = ({ down, isAdmin }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(down.text);
  const [newTitle, setNewTitle] = useState(down.title);
  const [newDownFile, setNewDownFile] = useState(down.downFileUrl);
  const downdate = new Date(down.createdAt?.toDate()).toUTCString();
  const downURL = newDownFile.replace(
    "https://firebasestorage.googleapis.com/",
    ""
  );

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await db
      .doc(`download/${down.id}`)
      .update({
        title: newTitle,
        text: newText,
        downFileUrl: newDownFile,
      })
      .then(() => {
        alert("수정완료");
      });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "newTitle") {
      setNewTitle(value);
    } else if (name === "newText") {
      setNewText(value);
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
      setNewDownFile(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const downDel = () => {
    db.collection("download").doc(down.id).delete();
    storageService.ref().child(`download/${down.downFileName}`).delete();
  };

  const downAction = (e) => {
    e.preventDefault();
    Axios({
      url: `/${downURL}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      file_api(response.data, down.downFileName);
    });
  };

  return (
    <div className="DownView">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="feedEdit">
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={newTitle}
                required
                onChange={onChange}
                name="newTitle"
              />
              <input
                type="text"
                value={newText}
                required
                onChange={onChange}
                name="newText"
              />
              <input type="file" multiple onChange={onFileChange} />
              <input type="submit" value="수정" className="feedEditSubmit" />
              <span onClick={toggleEditing} className="feedEditCancel">
                취소
              </span>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="date">
            <Moment format="MMM Do H:mm">{downdate}</Moment>
          </div>
          <div className="down-container">
            <h3 className="downTitle">{down.title}</h3>

            <div className="downText-container">
              <span className="downText">{down.text}</span>
            </div>
            {down.downFileUrl ? (
              <>
                <div className="downBtn">
                  <span onClick={(e) => downAction(e)}>
                    <DownloadOutlined />
                  </span>
                </div>
              </>
            ) : (
              ""
            )}

            {isAdmin && (
              <div className="AdminOption">
                <div className="adminEdit" onClick={toggleEditing}>
                  <EditIcon />
                  편집
                </div>
                <div className="adminDelete" onClick={downDel}>
                  <DeleteIcon />
                  삭제
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DownView;
