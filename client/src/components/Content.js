import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId }) {
  const { chatId } = useParams();

  if (!chats || chats.length === 0) {
    return (
      <>
        <h3>Content</h3>
        <p>No chat data available</p>
      </>
    );
  }

  const currentChat = chats.find(
    (chat) => chat.id === (chatId || activeChatId)
  );

  return (
    <>
      <h3>Content</h3>
      <div className="content-container"></div>
      {currentChat ? (
        <div>
          {currentChat.id}
          {currentChat.messages.map((msg, index) => (
            <p key={index}>
              {msg.sender} {msg.prompt}
            </p>
          ))}
        </div>
      ) : (
        <div className="">
          <p>No chat</p>
        </div>
      )}
    </>
  );
}

export default Content;
