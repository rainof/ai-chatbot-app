import React from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId, updateResponse }) {
  const { chatId } = useParams();

  const currentChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <>
      <h3>Content</h3>
      <div className="content-container">
        {updateResponse ? (
          <div>
            <p>Active Chat ID: {activeChatId}</p>
            {updateResponse.map((msg, index) => (
              <div key={index}>
                {msg.sender === "user" ? (
                  <div>
                    {msg.sender}---{msg.content}
                  </div>
                ) : (
                  <div>
                    {msg.sender}+++{msg.content}
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
      </div>
    </>
  );
}

export default Content;
