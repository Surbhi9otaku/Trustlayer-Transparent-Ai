import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch(
        "https://YOUR-BACKEND-URL.onrender.com/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          TrustLayer – Transparent AI
        </h2>

        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={askAI}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {response && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#334155",
              borderRadius: "6px",
            }}
          >
            <strong>AI Response:</strong>
            <p>{response}</p>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "15px",
              color: "red",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;