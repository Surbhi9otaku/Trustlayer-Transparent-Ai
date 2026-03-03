import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!input) return;

    setLoading(true);
    setResult(null);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="hero">
        <h1 className="logo">TrustLayer</h1>
        <p className="tagline">Transparent AI. Verifiable Decisions.</p>

        <div className="glass-card">
          <textarea
            placeholder="Enter your AI query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={analyzeText}>
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>

        {result && (
          <div className="result-card">
            <h3>AI Audit Result</h3>
            <p><strong>Response:</strong> {result.response}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            <p><strong>Risk Level:</strong> {result.risk}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;