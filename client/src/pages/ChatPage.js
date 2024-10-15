import React from "react";
import TopBar from "../components/NavBar";
import Content from "../components/Content";
import InputField from "../components/InputField";

function ChatPage({
  chats,
  activeChatId,
  setActiveChatId,
  setClickAdd,
  handleSend,
  updateResponse,
}) {
  return (
    <>
      <TopBar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setClickAdd={setClickAdd}
      />
      <Content
        chats={chats}
        activeChatId={activeChatId}
        updateResponse={updateResponse}
      />
      <InputField handleSend={handleSend} setActiveChatId={setActiveChatId} />
    </>
  );
}

export default ChatPage;
