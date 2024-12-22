import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [clickAdd, setClickAdd] = useState(false);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [chatTitle, setChatTitle] = useState(null);

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

  const getChatResponse = async (chatId) => {
    const chatToSend = chats.find((chat) => chat.id === chatId);

    if (
      !chatToSend ||
      !Array.isArray(chatToSend.messages) ||
      chatToSend.messages.length === 0
    ) {
      console.error("Chat or messages not found or empty");
      return;
    }
    const lastMessage = chatToSend.messages[chatToSend.messages.length - 1];
    const body = {
      chatId: chatToSend.id,
      prompt: chatToSend.messages[chatToSend.messages.length - 1].prompt,
    };

    try {
      const response = await fetch(`http://localhost:8000/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(body);
        console.error("Failed to fetch chat response:", errorDetails);
        return;
      }

      const data = await response.json();
      setUpdateResponse(data.messages);

      if (!chatTitle && data.topic) {
        setChatTitle(data.topic);
      }
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                title: data.topic || "No title",
                messages: data.messages,
              }
            : chat
        )
      );
    } catch (error) {
      console.error(
        `An error occurred while sending the message to chat ID ${chatId}:`,
        error
      );
    }
  };

  const fetchChatById = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:8000/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId: chatId }),
      });

      const data = await response.json();
      setUpdateResponse(data.messages);
    } catch (error) {
      console.error(
        `An error occurred while sending the message to chat ID ${chatId}:`,
        error
      );
    }
  };

  useEffect(() => {
    console.log("Title:", chatTitle);
  }, [chatTitle]);

  useEffect(() => {
    if (!isDelete && activeChatId) {
      getChatResponse(activeChatId);
    }
    setIsDelete(false);
  }, [chats, activeChatId, isDelete]);

  return {
    chats,
    setChats,
    activeChatId,
    setActiveChatId,
    setClickAdd,
    handleSend,
    setChats,
    updateResponse,
    getChatResponse,
    fetchChatById,
    setIsDelete,
    chatTitle,
  };
};
