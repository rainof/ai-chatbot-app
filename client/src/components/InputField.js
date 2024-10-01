import React, { useState } from "react";

function InputField({ handleSend }) {
  const [prompt, setPrompt] = useState("");

  const onSend = () => {
    handleSend(prompt);
    setPrompt("");
  };

  return (
    <>
      <h3>Input field</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={onSend}>Send</button>
    </>
  );
}

export default InputField;
