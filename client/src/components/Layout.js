import React from "react";
import TopBar from "./TopBar";
import Content from "./Content";
import InputField from "./InputField";

function Layout({
  chats,
  activeChatId,
  setActiveChatId,
  startNewChat,
  handleSend,
  clickAdd,
  setClickAdd,
}) {
  return (
    <>
      <TopBar
        chats={chats}
        startNewChat={startNewChat}
        setActiveChatId={setActiveChatId}
        setClickAdd={setClickAdd}
      />
      <Content chats={chats} activeChatId={activeChatId} clickAdd={clickAdd} />
      <InputField handleSend={handleSend} />
    </>
  );
}

export default Layout;
