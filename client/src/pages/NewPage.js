import React from "react";
import NavBar from "../components/NavBar";
import InputField from "../components/InputField";

function NewPage({
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
      {/* Blank content for a new page */}
      <div className="content-container">
        <p>No chats yet. Start a new conversation!</p>
      </div>
      <InputField handleSend={handleSend} />
    </>
  );
}

export default NewPage;
