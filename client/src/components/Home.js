import React from "react";

const Home = ({ handleSend }) => {
  const [prompt, setPrompt] = React.useState("");

  const onSend = () => {
    handleSend(prompt);
    setPrompt("");
  };

  return (
    <>
      <h1>Welcome to the AI Chatbot App!</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={onSend}>Send</button>
    </>
  );
};

export default Home;
