import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const startNewChat = async () => {
    const response = await fetch("http://localhost:8000/start-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.chatId;
  };

  const handleSend = async () => {
    if (prompt.trim()) {
      const userMessage = { sender: "user", message: prompt };
      let chatId = activeChatId;

      if (!chatId) {
        chatId = await startNewChat();
        setActiveChatId(chatId);
        setChats((prevChats) => [
          ...prevChats,
          { id: chatId, messages: [userMessage] },
        ]);
      } else {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, userMessage] }
              : chat
          )
        );
      }

      const response = await fetch("http://localhost:8000/chat-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId, prompt }),
      });

      const data = await response.json();
      const aiMessage = { sender: "ai", message: data.response };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setPrompt("");
    }
  };

  const handleNewChatClick = () => {
    setActiveChatId(null);
  };

  return (
    <div className="app-container">
      <header>
        <button onClick={handleNewChatClick}>New Chat</button>
      </header>
      <div className="main-container">
        <nav>
          Previous chat
          <div className="chat-history">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => setActiveChatId(chat.id)}
              >
                Chat {chat.id}
              </div>
            ))}
          </div>
        </nav>
        <div className="chat-container">
          Conversation
          <div className="chat-area">
            {chats
              .find((chat) => chat.id === activeChatId)
              ?.messages.map((msg, index) => (
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
