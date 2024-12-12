import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function NavBar({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  setClickAdd,
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
    if (id === activeChatId) {
      navigate("/new-chat");
    }
    const updateChats = chats.filter((chat) => chat.id !== id);
    setChats(updateChats);
    setIsDelete(true);
  };

  return (
    <div className="nav-container bg-white shadow-lg">
      <div className="nav-bar flex justify-between items-center p-4">
        <MenuRoundedIcon
          onClick={toggleNavVisibility}
          className="icon-style menu-btn text-gray-600 cursor-pointer"
        />
        <Link to="/new-chat">
          <AddRoundedIcon
            onClick={onAdd}
            className="icon-style add-btn text-gray-600 cursor-pointer"
          />
        </Link>
      </div>

      <div
        className={`chat-nav transition-transform transform ${
          isNavVisible ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-bold">Previous Chats</h3>
          <MenuRoundedIcon
            onClick={toggleNavVisibility}
            className="icon-style text-gray-400 cursor-pointer"
          />
        </div>
        <ul className="chat-links space-y-4 px-4">
          {chats.map((chat) => (
            <li key={chat.id} className="flex justify-between items-center">
              <Link
                to={`/c/${chat.id}`}
                onClick={() => handleSetActiveChatId(chat.id)}
                className="text-blue-300 hover:underline"
              >
                Chat: {chat.id.substring(0, 15) + "..."}
              </Link>
              <button
                onClick={() => handleDeleteChat(chat.id)}
                className="text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
