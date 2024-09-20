import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/chat-test/${chatId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.messages) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div>
      <h2>Chat {chatId}</h2>
      {error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="chat-history">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <div>{msg.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
