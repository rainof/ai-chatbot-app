import React from "react";
import Content from "../components/Content";

function NewChatPage({ chats, activeChatId, clickAdd }) {
  console.log("--NewChatPage--");

  return (
    <Content chats={chats} activeChatId={activeChatId} clickAdd={clickAdd} />
  );
}

export default NewChatPage;
