import React from "react";
import Content from "../components/Content";

function ChatPage({ chats, activeChatId, clickAdd }) {
  console.log("--ChatPage--");

  return (
    <Content chats={chats} activeChatId={activeChatId} clickAdd={clickAdd} />
  );
}

export default ChatPage;
