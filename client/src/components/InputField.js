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
    <div className="input-container fixed bottom-0 left-0 w-full bg-gray-100 p-4 shadow-md flex items-center">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <SendRoundedIcon
        onClick={onSend}
        className="icon-style send-btn text-blue-500 cursor-pointer ml-4"
      />
    </div>
  );
}

export default InputField;
