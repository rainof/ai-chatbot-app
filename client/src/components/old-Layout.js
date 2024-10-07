import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Content from "./Content";
import InputField from "./InputField";

function Layout() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [clickAdd, setClickAdd] = useState(false);

  const navigate = useNavigate();

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
      navigate(`/c/${chatId}`);
    }
  };

  useEffect(() => {
    console.log("Updated Chats:", chats);
  }, [chats]);
  return (
    <>
      <TopBar
        chats={chats}
        startNewChat={startNewChat}
        setActiveChatId={setActiveChatId}
        setClickAdd={setClickAdd}
      />
      <Content chats={chats} activeChatId={activeChatId} />
      <InputField handleSend={handleSend} />
    </>
  );
}

export default Layout;
