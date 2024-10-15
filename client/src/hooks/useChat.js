import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [clickAdd, setClickAdd] = useState(false);
  const [updateResponse, setUpdateResponse] = useState(null);

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

      let chatId = activeChatId;
      if (!chatId || clickAdd) {
        chatId = await startNewChat(userMessage);
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, userMessage] }
              : chat
          )
        );
      }
      navigate(`/c/${chatId}`);
    }
  };

  const fetchMessageById = async (chatId) => {
    const chatToSend = chats.find((chat) => chat.id === chatId);
    if (chatToSend && chatToSend.messages.length > 0) {
      const message = chatToSend.messages[chatToSend.messages.length - 1];

      const body = {
        chatId: chatToSend.id,
        prompt: chatToSend.messages[chatToSend.messages.length - 1].prompt,
      };

      try {
        const response = await fetch(`http://localhost:8000/chats/${chatId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setUpdateResponse(data.messages);
      } catch (error) {
        console.error(
          `An error occurred while sending the message to chat ID ${chatId}:`,
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchMessageById(activeChatId);
  }, [chats]);

  useEffect(() => {
    // console.log("Updated message:", updateResponse);
  }, [updateResponse]);

  return {
    chats,
    activeChatId,
    setActiveChatId,
    setClickAdd,
    handleSend,
    setChats,
    updateResponse,
  };
};
