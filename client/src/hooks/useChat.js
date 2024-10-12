import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [clickAdd, setClickAdd] = useState(false);

  const navigate = useNavigate();

  const startNewChat = async (userMessage) => {
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
    setClickAdd(false);
    return chatId;
  };

  const handleSend = async (prompt) => {
    if (prompt.trim()) {
      const userMessage = { sender: "user", prompt: prompt.trim() };
      console.log("userMessage:", userMessage);

      let chatId = activeChatId;
      if (!chatId || clickAdd) {
        chatId = await startNewChat(userMessage);
        console.log("New chat ID:", chatId);
      } else {
        console.log("Existing chat ID:", chatId);
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
    console.log("Chats:", chats);
    console.log("----------");
  };

  useEffect(() => {
    console.log("Updated chats:", chats);
  }, [chats]);

  return {
    chats,
    activeChatId,
    setActiveChatId,
    setClickAdd,
    handleSend,
    setChats,
  };
};
