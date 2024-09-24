import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ chats, setActiveChatId, startNewChat }) => {
  return (
    <>
      <NavBar
        chats={chats}
        setActiveChatId={setActiveChatId}
        startNewChat={startNewChat}
      />
      <Outlet />
    </>
  );
};

export default Layout;
