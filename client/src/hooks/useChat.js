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
      // console.log("Updated chats:", chats);
      // fetchMessageById(chatId);
      navigate(`/c/${chatId}`);
    }
    console.log("Chats:", chats);
    console.log("----------");
  };

  const fetchMessageById = async (chatId) => {
    const chatToSend = chats[0];
    console.log("Chat to send:", chatToSend);

    if (chatToSend && chatToSend.id) {
      console.log("Chat ID:", chatToSend.id);
      console.log(
        "Chat message:",
        chatToSend.messages[chatToSend.messages.length - 1].prompt
      );
    } else {
      console.error("chatToSend is undefined or doesn't have an id");
    }

    if (chatToSend) {
      const body = {
        chatId: chatToSend.id,
        prompt: chatToSend.messages[chatToSend.messages.length - 1].prompt,
      };

      const response = await fetch(`http://localhost:8000/chats/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("FetchMessage:", response);
    }
  };

  useEffect(() => {
    console.log("Updated chats:", chats);
    fetchMessageById(activeChatId);
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
