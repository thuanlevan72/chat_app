import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getItem, setItem } from "./helpers/localStorageControl";
import ChatApp from "./pages/ChatApp";
import Login from "./pages/Login";
let ILogin = getItem("ILogin");
const App = () => {
  // useEffect(() => {}, [ILogin]);
  return (
    <>
      {!ILogin && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {ILogin && (
        <Routes>
          <Route path="/" element={<ChatApp />} />
        </Routes>
      )}
    </>
  );
};

export default App;
