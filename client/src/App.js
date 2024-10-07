import React from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Content from "./components/Content";
import NewPage from "./pages/NewPage";
import ChatPage from "./pages/ChatPage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="c/:chatId" element={<ChatPage />} />
        <Route path="new-chat" element={<NewPage />} />
      </Routes>
    </div>
  );
}

export default App;
