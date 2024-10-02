import React from "react";
import { Link } from "react-router-dom";

function TopBar({ chats, startNewChat, setActiveChatId }) {
  return (
    <div>
      <h3>TopBar</h3>
      <button className="previous-chat-btn">☰</button>
      {chats.map((chat) => (
        <Link
          key={chat.id}
          to={`/c/${chat.id}`}
          className="chat-item"
          onClick={() => setActiveChatId(chat.id)}
        >
          <div>Chat {chat.id}</div>
        </Link>
      ))}
      <Link to="/new-chat">
        <button className="new-chat-btn" onClick={startNewChat}>
          +
        </button>
      </Link>
    </div>
  );
}

export default TopBar;
