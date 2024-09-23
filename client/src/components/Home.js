import React, { useState } from "react";
import "../styles/Home.scss";

const Home = ({ handleSend, activeChatId, chats }) => {
  const [prompt, setPrompt] = useState("");

  // Get current chat from activeChatId
  const currentChat = chats.find((chat) => chat.id === activeChatId);
  console.log("Current chat:", currentChat);

  const onSend = () => {
    if (!prompt.trim()) {
      console.warn("Cannot send an empty message.");
      return;
    }

    console.log("Prompt:", prompt);
    handleSend(prompt);
    setPrompt("");
  };

  return (
    <>
      <h1>Welcome to the AI Chatbot App!</h1>
      <div className="chat-container">
        {currentChat ? (
          currentChat.messages.length > 0 ? (
            currentChat.messages.map((msg, index) => (
              <div key={index} className={`chat-item ${msg.sender}`}>
                {/* {msg.prompt} */}
                {msg.message}
              </div>
            ))
          ) : (
            <p>No message yet. Start the conversation!</p>
          )
        ) : (
          <p>No active chat found. Please start a new chat.</p>
        )}
      </div>
      <div className="prompt-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          id="input-prompt"
        />
        <button id="submit-btn" onClick={onSend}>
          Send
        </button>
      </div>
    </>
  );
};

export default Home;
