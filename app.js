import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>TrustLayer AI</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "300px", padding: "10px" }}
      />

      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Ask
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Answer:</h3>
          <p>{response.answer}</p>

          <h4>Audit Log:</h4>
          <pre>{JSON.stringify(response.audit_log, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;