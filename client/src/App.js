import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Chat from "./components/Chat";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const startNewChat = async () => {
    const response = await fetch("http://localhost:8000/start-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const chatId = data.chatId;
    setActiveChatId(chatId);
    setChats([...chats, { id: chatId, messages: [] }]);
    return chatId;
  };

  const handleSend = async (prompt) => {
    if (prompt.trim()) {
      const userMessage = { sender: "user", prompt: prompt };
      let chatId = activeChatId;

      if (!chatId) {
        chatId = await startNewChat();
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, userMessage] }
              : chat
          )
        );
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Layout chats={chats} setActiveChatId={setActiveChatId} />}
          >
            <Route path="c/:chatId" element={<Chat />} />
            <Route index element={<Home handleSend={handleSend} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
