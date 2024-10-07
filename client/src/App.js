import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Content from "./components/Content";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="c/:chatId" element={<Layout />} />
        <Route path="new-chat" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
