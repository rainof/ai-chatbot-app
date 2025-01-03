import React, { useState, useEffect } from "react";
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
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [deletedChatId, setDeletedChatId] = useState(null);

  const onAdd = () => {
    setClickAdd(true);
    setActiveChatId(null);
    setIsNavVisible(false);
  };

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  const closeNav = () => {
    setIsNavVisible(false);
  };

  const handleSetActiveChatId = (id) => {
    fetchChatById(id);
    setActiveChatId(id);
  };

  const handleDeleteChat = (id) => {
    if (id === activeChatId) {
      navigate("/new-chat");
      setActiveChatId(null);
    }

    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
    setDeletedChatId(id);
    setIsDelete(true);
  };

  useEffect(() => {
    if (deletedChatId) {
      console.log(`Deleted Chat ID: ${deletedChatId}`);
      console.log("Updated chats:", chats);
      setDeletedChatId(null);
    }
  }, [chats, deletedChatId]);

  return (
    <div className="input-container fixed bottom-0 left-0 w-full bg-gray-100 p-4 shadow-md flex items-center relative">
      <div className="nav-bar fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center p-4">
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

      {isNavVisible && (
        <div
          onClick={closeNav}
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-40"
        ></div>
      )}

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
            <li
              key={chat.id}
              className="flex justify-between items-center hover:bg-gray-900 px-3 py-2 rounded-lg"
            >
              <Link
                to={`/c/${chat.id}`}
                onClick={() => {
                  handleSetActiveChatId(chat.id);
                  closeNav();
                }}
              >
                <span className="text-blue-300">
                  {chat.title || "No title available"}
                </span>
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
