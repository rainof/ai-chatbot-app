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

      let chatId = activeChatId;
      console.log("--->", chatId);
      console.log("--->", prompt);
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
    console.log("Chats:", chats);
    const chatToSend = chats.find((chat) => chat.id === chatId);
    if (chatToSend && chatToSend.messages.length > 0) {
      const message = chatToSend.messages[chatToSend.messages.length - 1];
      console.log("Message:", message);

      const body = {
        chatId: chatToSend.id,
        prompt: chatToSend.messages[chatToSend.messages.length - 1].prompt,
      };
      console.log("Body:", body);

      try {
        const response = await fetch(`http://localhost:8000/chats/${chatId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log("FetchMessage:", data);
      } catch (error) {
        console.error(
          `An error occurred while sending the message to chat ID ${chatId}:`,
          error
        );
      }
    }
  };

  useEffect(() => {
    // console.log("Updated chats:", chats);
    // console.log("ActiveChatId", activeChatId);
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
