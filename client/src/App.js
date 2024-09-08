import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <button>New command</button>
      </header>
      <main>
        <nav>
          <h4>Previous conversations</h4>
          <div className="history-box"></div>
        </nav>
        <div className="conversation-container">
          <h4 className="posted-message">Conversation</h4>
          <label>Prompt: </label>
          <input type="text" name="prompt" placeholder="Add prompt here" />
        </div>
      </main>
    </div>
  );
}

export default App;
