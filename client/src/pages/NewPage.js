import React from "react";
import TopBar from "../components/TopBar";
import InputField from "../components/InputField";

function NewPage({ chats, setClickAdd, handleSend }) {
  return (
    <>
      <TopBar chats={chats} setClickAdd={setClickAdd} />
      {/* Blank content for a new page */}
      <div className="content-container">
        <p>No chats yet. Start a new conversation!</p>
      </div>
      <InputField handleSend={handleSend} />
    </>
  );
}

export default NewPage;
