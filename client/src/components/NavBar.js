import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ chats, setActiveChatId }) => {
  const uniqueChats = chats.filter(
    (chat, index, self) => self.findIndex((c) => c.id === chat.id) === index
  );

  return (
    <>
      <nav>
        Previous chat
        <div className="nav-history">
          {uniqueChats.map((chat) => (
            <Link
              key={chat.id}
              to={`/c/${chat.id}`}
              className="nav-item"
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
