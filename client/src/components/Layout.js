import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ chats, setActiveChatId }) => {
  return (
    <>
      <NavBar chats={chats} setActiveChatId={setActiveChatId} />
      <Outlet />
    </>
  );
};

export default Layout;
