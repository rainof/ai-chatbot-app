import React from "react";
import TopBar from "./TopBar";
import Content from "./Content";
import InputField from "./InputField";

function Layout({ startNewChat, handleSend }) {
  return (
    <>
      <TopBar startNewChat={startNewChat} />
      <Content />
      <InputField handleSend={handleSend} />
    </>
  );
}

export default Layout;
