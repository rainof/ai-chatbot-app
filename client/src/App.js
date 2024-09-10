import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const handleSend = async () => {
    if (prompt.trim()) {
      const userMessage = { sender: "user", message: prompt };
      setConversation([...conversation, userMessage]);

      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      const aiMessage = {
        sender: "ai",
        message: data.input + "++++" + data.output,
      };

      setConversation([...conversation, userMessage, aiMessage]);
      setPrompt("");
    }
  };

  return (
    <div className="app-container">
      <header>
        <button>New Chat</button>
      </header>
      <div className="main-container">
        <nav>
          Previous chat
          <div className="chat-history">{/* TBA */}</div>
        </nav>
        <div className="chat-container">
          Conversation
          <div className="chat-area">
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.message}
              </div>
            ))}
          </div>
          <label>Prompt: </label>
          <input
            type="text"
            name="prompt"
            placeholder="Add prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input
            type="button"
            id="send-btn"
            value="Send"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
