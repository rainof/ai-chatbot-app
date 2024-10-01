import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId }) {
  const { chatId } = useParams();
  const currentChat = chats.find(
    (chat) => chat.id === (chatId || activeChatId)
  );

  return (
    <>
      <h3>Content</h3>
      <div className="content-container"></div>
      {currentChat ? (
        <div>
          {currentChat.messages.map((msg, index) => (
            <p key={index}>{msg.prompt}</p>
          ))}
        </div>
      ) : (
        <div className="">
          <p>Loading chat...</p>
        </div>
      )}
    </>
  );
}

export default Content;
