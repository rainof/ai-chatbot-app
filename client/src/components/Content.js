import React from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId, updateResponse }) {
  const { chatId } = useParams();

  const currentChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="content-container p-4 bg-gray-100 rounded-lg shadow-md">
      {updateResponse ? (
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Active Chat ID: {activeChatId}
          </p>
          {updateResponse.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {msg.sender}: {msg.content}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No chat</p>
        </div>
      )}
    </div>
  );
}

export default Content;
