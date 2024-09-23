import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Chat.scss";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setMessages(data.messages || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h2>Chat {chatId}</h2>
      <div className="current-message">
        <h3>Chat</h3>
        {messages.map((msg, index) => (
          <div key={index} className="each-message">
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
