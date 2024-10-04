import React from "react";
import Layout from "../components/Layout";

function HomePage({
  chats,
  activeChatId,
  setActiveChatId,
  startNewChat,
  handleSend,
  clickAdd,
  setClickAdd,
}) {
  console.log("--HomePage--");

  return (
    <Layout
      chats={chats}
      activeChatId={activeChatId}
      setActiveChatId={setActiveChatId}
      startNewChat={startNewChat}
      handleSend={handleSend}
      clickAdd={clickAdd}
      setClickAdd={setClickAdd}
    />
  );
}

export default HomePage;
