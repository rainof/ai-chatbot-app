import React from "react";
import TopBar from "../components/TopBar";
import Content from "../components/Content";
import InputField from "../components/InputField";
import { useChat } from "../hooks/useChat";

function ChatPage() {
  const { chats, activeChatId, setActiveChatId, setClickAdd, handleSend } =
    useChat();
  return (
    <>
      <TopBar
        chats={chats}
        setActiveChatId={setActiveChatId}
        setClickAdd={setClickAdd}
      />
      <Content chats={chats} activeChatId={activeChatId} />
      <InputField handleSend={handleSend} />
    </>
  );
}

export default ChatPage;
