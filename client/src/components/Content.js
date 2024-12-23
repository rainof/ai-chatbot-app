import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Content({ chats, activeChatId, updateResponse }) {
  const { chatId } = useParams();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [updateResponse]);

  return (
    <div className="w-[90%] md:w-[675px] mx-auto py-12">
      {updateResponse ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            {updateResponse.map((msg, index) => (
              <div
                key={index}
                className={`flex my-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-6 py-3 my-2 rounded-3xl max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-300 text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <span className="block w-full">{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
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
