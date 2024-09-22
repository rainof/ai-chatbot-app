import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Chat from "./components/Chat";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [prompt, setPrompt] = useState("");

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
        setActiveChatId(chatId);
        setChats((prevChats) => [
          ...prevChats,
          { id: chatId, messages: [userMessage] },
        ]);
      } else {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, userMessage] }
              : chat
          )
        );
      }

      const response = await fetch("http://localhost:8000/chat-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ chatId, message: prompt }),
        body: JSON.stringify({ chatId, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = { sender: "ai", message: data.response };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setPrompt("");
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
            <Route
              index
              element={
                <Home
                  handleSend={handleSend}
                  activeChatId={activeChatId}
                  chats={chats}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
