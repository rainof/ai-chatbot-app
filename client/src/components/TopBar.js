import React from "react";
import { Link } from "react-router-dom";

function TopBar({ StartNewChat }) {
  return (
    <div>
      <h3>TopBar</h3>
      <button className="previous-chat-btn">☰</button>
      <Link to="/new-chat">
        <button className="new-chat-btn" onClick={StartNewChat}>
          +
        </button>
      </Link>
    </div>
  );
}

export default TopBar;
