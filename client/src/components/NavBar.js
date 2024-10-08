import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TopBar.scss";

function TopBar({ chats, startNewChat, setActiveChatId, setClickAdd }) {
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisibile] = useState(false);

  const onAdd = () => {
    console.log("Add button is clicked");
    setClickAdd(true);
    navigate("/new-chat");
  };

  const toggleNavVisibility = () => {
    setIsNavVisibile(!isNavVisible);
  };

  return (
    <div className="navbar">
      {/* <h3>TopBar</h3> */}

      <button onClick={toggleNavVisibility} className="menu-toggle">
        ☰
      </button>

      <nav className="chat-nav">
        {chats.length === 0 ? (
          <p>No active chat yet.</p>
        ) : (
          <ul className={`chat-links ${isNavVisible ? "visible" : "hidden"}`}>
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link
                  to={`/c/${chat.id}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  Chat: {chat.id}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <Link to="/new-chat">
        <button className="new-chat-btn" onClick={onAdd}>
          +
        </button>
      </Link>
    </div>
  );
}

export default TopBar;
