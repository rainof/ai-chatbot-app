import React from "react";
import { Link } from "react-router-dom";
import "./../styles/NavBar.scss";

const NavBar = ({ chats, setActiveChatId, startNewChat }) => {
  // const uniqueChats = chats.filter(
  //   (chat, index, self) => self.findIndex((c) => c.id === chat.id) === index
  // );

  const chatsWithMessages = chats.filter((chat) => chat.messages.length > 0);

  // const handleNewChat = async () => {
  //   const newChatId = await startNewChat();
  //   setActiveChatId(newChatId);
  // };

  return (
    <>
      <nav>
        <div className="nav-action">
          <button id="new-chat-btn" onClick={startNewChat}>
            New Chat
          </button>
        </div>
        Previous chat
        <div className="nav-history">
          {chatsWithMessages.map((chat) => (
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
