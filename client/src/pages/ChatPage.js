import React from "react";
import NavBar from "../components/NavBar";
import Content from "../components/Content";
import InputField from "../components/InputField";

function ChatPage({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  setClickAdd,
  handleSend,
  updateResponse,
  getChatResponse,
  fetchChatById,
  setIsDelete,
}) {
  return (
    <>
      <NavBar
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setClickAdd={setClickAdd}
        getChatResponse={getChatResponse}
        fetchChatById={fetchChatById}
        setIsDelete={setIsDelete}
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
