import React from "react";
import { Routes, Route } from "react-router-dom";
import { useChat } from "./hooks/useChat";
import NewPage from "./pages/NewPage";
import ChatPage from "./pages/ChatPage";
import "./App.scss";

function App() {
  const chatHook = useChat();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewPage {...chatHook} />} />
        <Route path="c/:chatId" element={<ChatPage {...chatHook} />} />
        <Route path="new-chat" element={<NewPage {...chatHook} />} />
      </Routes>
    </div>
  );
}

export default App;
