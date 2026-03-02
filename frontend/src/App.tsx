import React from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeText = async () => {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>TrustLayer AI Transparency Tool</h1>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter AI text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br /><br />

      <button onClick={analyzeText}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response:</h3>
          <p>{result.response}</p>
          <p><b>Confidence:</b> {result.confidence}</p>
          <p><b>Explanation:</b> {result.explanation}</p>
          <p><b>Risk:</b> {result.risk}</p>
        </div>
      )}
    </div>
  );
}

export default App;