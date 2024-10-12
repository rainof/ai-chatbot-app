import React from "react";
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
          {currentChat.id}
          {currentChat.messages.map((msg, index) => (
            <div key={index}>
              {/* {msg.sender} {msg.prompt} */}
              {msg.sender === "user" ? (
                <div>
                  {msg.sender}---{msg.prompt}
                </div>
              ) : (
                <div>
                  {msg.sender}+++{msg.prompt}
                </div>
              )}
            </div>
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
