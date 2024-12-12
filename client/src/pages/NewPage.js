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
    <div className="flex flex-col h-screen bg-gray-100">
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
      <div className="flex flex-grow items-center justify-center text-center">
        <p className="text-gray-500 text-lg font-medium">
          Start a new conversation!
        </p>
      </div>
      <div className="p-4">
        <InputField handleSend={handleSend} />
      </div>
    </div>
  );
}

export default NewPage;
