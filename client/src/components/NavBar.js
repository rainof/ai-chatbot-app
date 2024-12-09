import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    setIsNavVisibile(false);
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
    <div className="nav-container">
      <div className="nav-bar">
        <MenuRoundedIcon
          onClick={toggleNavVisibility}
          className="icon-style menu-btn"
        />
        <Link to="/new-chat">
          <AddRoundedIcon onClick={onAdd} className="icon-style add-btn" />
        </Link>
      </div>

      <div className={`chat-nav ${isNavVisible ? "visible" : "hidden"}`}>
        <div>
          <MenuRoundedIcon
            onClick={toggleNavVisibility}
            className="icon-style menu-btn"
          />
          <h3>Previous Chat</h3>
        </div>
        <ul className="chat-links">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/c/${chat.id}`}
                onClick={() => handleSetActiveChatId(chat.id)}
              >
                Chat: {chat.id.substring(0, 15) + "..."}
              </Link>
              <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
