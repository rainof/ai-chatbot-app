import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.scss";
import { Button } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function NavBar({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  setClickAdd,
  getChatResponse,
  fetchChatById,
  setIsDelete,
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
    setIsDelete(true);
  };

  return (
    <div className="navbar">
      <MenuRoundedIcon
        onClick={toggleNavVisibility}
        className="icon-style menu-btn"
      />

      <nav className="chat-nav">
        <ul className={`chat-links ${isNavVisible ? "visible" : "hidden"}`}>
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/c/${chat.id}`}
                onClick={() => handleSetActiveChatId(chat.id)}
              >
                Chat: {chat.id}
              </Link>
              <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
            </li>
          ))}
          <div>ActiveChatId: {activeChatId}</div>
        </ul>
      </nav>
      <Link to="/new-chat">
        <AddRoundedIcon onClick={onAdd} className="icon-style add-btn" />
      </Link>
    </div>
  );
}

export default NavBar;
