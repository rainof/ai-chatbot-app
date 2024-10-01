import React from "react";
import TopBar from "./TopBar";
import Content from "./Content";
import InputField from "./InputField";

function Layout({ chats, activeChatId, startNewChat, handleSend }) {
  return (
    <>
      <TopBar startNewChat={startNewChat} />
      <Content chats={chats} activeChatId={activeChatId} />
      <InputField handleSend={handleSend} />
    </>
  );
}

export default Layout;
