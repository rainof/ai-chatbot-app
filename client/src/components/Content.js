import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId, clickAdd }) {
  const { chatId } = useParams();
  const currentChatId = chatId || activeChatId;
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    console.log("Click add state changed:", clickAdd);
  }, [clickAdd]);

  return (
    <>
      <h3>Content</h3>
      <div className="content-container"></div>
      {currentChat && !clickAdd ? (
        <div>
          <h4>Chat ID: {currentChat.id}</h4>
          {currentChat.messages.map((msg, index) => (
            <p key={index}>
              {msg.sender} {msg.prompt}
            </p>
          ))}
        </div>
      ) : clickAdd ? (
        <div className="empty-chat">
          <p>Create a new chat</p>
        </div>
      ) : (
        <div className="empty-chat">
          <p>Welcome to AI chat bot, please select or create a new chat!</p>
        </div>
      )}
    </>
  );
}

export default Content;
