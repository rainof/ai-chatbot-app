import React from "react";
import { Link, useNavigate } from "react-router-dom";

function TopBar({ chats, startNewChat, setActiveChatId, setClickAdd }) {
  const navigate = useNavigate();

  const onAdd = () => {
    console.log("Add button is clicked");
    setClickAdd(true);
    navigate("/new-chat");
  };

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
        <button className="new-chat-btn" onClick={onAdd}>
          +
        </button>
      </Link>
    </div>
  );
}

export default TopBar;
