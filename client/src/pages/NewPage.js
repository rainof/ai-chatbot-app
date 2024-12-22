import React from "react";
import NavBar from "../components/NavBar";
import InputField from "../components/InputField";
import GrayLogo from "../images/logo-gray.png";

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
      <div className="flex flex-col flex-grow items-center justify-center text-center">
        <div className="h-12 w-12">
          <img src={GrayLogo} alt="Gray Logo" />
        </div>
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
