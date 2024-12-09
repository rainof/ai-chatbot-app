import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function InputField({ handleSend, setActiveChatId }) {
  const [prompt, setPrompt] = useState("");

  const onSend = () => {
    handleSend(prompt);
    setPrompt("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-grow"
      />
      <SendRoundedIcon onClick={onSend} className="icon-style send-btn" />
    </div>
  );
}

export default InputField;
