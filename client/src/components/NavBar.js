import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.scss";

function NavBar({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  setClickAdd,
  getChatResponse,
  fetchChatById,
}) {
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisibile] = useState(false);

  const onAdd = () => {
    setClickAdd(true);
    setActiveChatId(null);
    navigate("/new-chat");
  };

  const toggleNavVisibility = () => {
    setIsNavVisibile(!isNavVisible);
  };

  const handleSetActiveChatId = (id) => {
    fetchChatById(id);
    setActiveChatId(id);
  };

  const handleDeleteChat = (id) => {
    console.log("activeChatId", activeChatId);
    console.log("Deleted id:", id);
    if (id === activeChatId) {
      navigate("/new-chat");
    }
    const updateChats = chats.filter((chat) => chat.id !== id);
    setChats(updateChats);
  };

  return (
    <div className="navbar">
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
                  onClick={() => handleSetActiveChatId(chat.id)}
                >
                  Chat: {chat.id}
                </Link>
                <button onClick={() => handleDeleteChat(chat.id)}>
                  Delete
                </button>
              </li>
            ))}
            <div>ActiveChatId: {activeChatId}</div>
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

export default NavBar;
