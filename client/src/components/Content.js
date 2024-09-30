import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content() {
  const { chatId } = useParams();
  const [chatData, setChatData] = useState(null);

  // useEffect(() => {
  //   const fetchChatData = async () => {
  //     const response = await fetch(`http://localhost:8000/chats/${chatId}`);
  //     const data = await response.json();
  //     setChatData(data);
  //   };
  //   fetchChatData();
  // }, [chatId]);

  return (
    <>
      <h3>Content</h3>
      <div className="content-container"></div>
      {chatData ? (
        <div>
          {chatData.messages.map((msg) => (
            <p key={msg.id}>{msg.text}</p>
          ))}
        </div>
      ) : (
        <p>Loading chat...</p>
      )}
    </>
  );
}

export default Content;
