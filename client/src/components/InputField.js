import React, { useState } from "react";

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
    <>
      <h3>Input field</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
      />
      <button onClick={onSend}>Send</button>
    </>
  );
}

export default InputField;
