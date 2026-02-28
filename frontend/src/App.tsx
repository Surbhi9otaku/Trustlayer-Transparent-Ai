import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setError("");
      const res = await fetch("http://localhost:8000/");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setError("Backend not connected");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>TrustLayer Transparent AI</h1>

      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Test Backend
      </button>

      {message && (
        <div style={{ marginTop: "15px", color: "green" }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ marginTop: "15px", color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default App;