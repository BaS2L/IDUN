import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";
import Loading from "../loading/Loading";

function App() {
  const [init, setInit] = useState(false);
  const [authObj, setAuthObj] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthObj({
          email: user.email,
        });
      } else {
        setAuthObj(null);
      }
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (authObj != null) {
      const fetch = authObj.email.split("@")[0];
      setId(fetch);
    }
  }, [authObj]);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(authObj)} authObj={authObj} id={id} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
