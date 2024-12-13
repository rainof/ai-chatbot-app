import React from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId, updateResponse }) {
  const { chatId } = useParams();

  const currentChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {updateResponse ? (
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Active Chat ID: {activeChatId}
          </p>
          {updateResponse.map((msg, index) => (
            <div
              key={index}
              className={`flex my-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-6 py-3 rounded-3xl max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-300 text-black"
                    : "text-black"
                }`}
              >
                <span className="block w-full">{msg.content}</span>
              </div>
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
