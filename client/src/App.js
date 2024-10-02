import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Content from "./components/Content";

import "./App.scss";

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [clickAdd, setClickAdd] = useState(false);

  const startNewChat = async (userMessage) => {
    console.log("[START NEW CHAT] Function");
    const response = await fetch("http://localhost:8000/new-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const chatId = data.chatId;
    setActiveChatId(chatId);
    setChats([...chats, { id: chatId, messages: [userMessage] }]);
    console.log("New ID:", chatId);
    return chatId;
  };

  const handleSend = async (prompt) => {
    console.log("Prompt:", prompt);

    if (prompt.trim()) {
      const userMessage = { sender: "user", prompt: prompt };
      console.log("User message:", userMessage);
      let chatId = activeChatId;
      if (!chatId || clickAdd) {
        console.log("Chat ID not found");
        chatId = await startNewChat(userMessage);
        setActiveChatId(chatId);
        console.log("New Chat ID:", chatId);
        setClickAdd(false);
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

  useEffect(() => {
    console.log("Updated Chats:", chats);
  }, [chats]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                chats={chats}
                activeChatId={activeChatId}
                setActiveChatId={setActiveChatId}
                startNewChat={startNewChat}
                handleSend={handleSend}
                clickAdd={clickAdd}
                setClickAdd={setClickAdd}
              />
            }
          >
            <Route
              path="c/:chatId"
              element={<Content chats={chats} activeChatId={activeChatId} />}
            />
            <Route
              path="new-chat"
              element={<Content chats={chats} activeChatId={activeChatId} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
