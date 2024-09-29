import React from "react";
import TopBar from "./TopBar";
import Content from "./Content";
import InputField from "./InputField";

function Layout({ startNewChat }) {
  return (
    <>
      <TopBar startNewChat={startNewChat} />
      <Content />
      <InputField />
    </>
  );
}

export default Layout;
