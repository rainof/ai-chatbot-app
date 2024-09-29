import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Content from "./components/Content";

import "./App.scss";

function App() {
  const startNewChat = async () => {
    const response = await fetch("http://localhost:8000/new-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    const chatId = data.chatId;
    console.log("chatId:", chatId);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="c/:chatId" element={<Content />} />
            <Route path="new-chat" element={<Content />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
