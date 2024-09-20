import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ chats, setActiveChatId }) => {
  return (
    <>
      <nav>
        Previous chat
        <div className="chat-history">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/c/${chat.id}`}
              className="chat-item"
              onClick={() => setActiveChatId(chat.id)}
            >
              Chat {chat.id}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
