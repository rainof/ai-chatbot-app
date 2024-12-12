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
    <div className="flex flex-col h-screen bg-white">
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
      <div className="flex flex-grow">
        <Content
          chats={chats}
          activeChatId={activeChatId}
          updateResponse={updateResponse}
        />
      </div>
      <div className="p-4 border-t border-gray-200">
        <InputField handleSend={handleSend} setActiveChatId={setActiveChatId} />
      </div>
    </div>
  );
}

export default ChatPage;
