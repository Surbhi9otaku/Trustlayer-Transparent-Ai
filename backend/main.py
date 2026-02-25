from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str

def calculator_tool(expression: str):
    try:
        return str(eval(expression))
    except:
        return "Invalid expression"

def search_tool(query: str):
    return f"Search results for '{query}' (demo data)"

def log_to_weilchain(data):
    print("Logged to WeilChain:", data)

@app.post("/ask")
def ask(query: Query):

    audit_log = []

    # Step 1
    audit_log.append({"step": 1, "action": "User Input", "data": query.question})
    log_to_weilchain(audit_log[-1])

    # Decision
    if any(char.isdigit() for char in query.question):
        audit_log.append({"step": 2, "action": "Tool Call", "tool": "Calculator"})
        log_to_weilchain(audit_log[-1])

        result = calculator_tool(query.question)
    else:
        audit_log.append({"step": 2, "action": "Tool Call", "tool": "Search"})
        log_to_weilchain(audit_log[-1])

        result = search_tool(query.question)

    # Final output
    audit_log.append({"step": 3, "action": "Final Output", "data": result})
    log_to_weilchain(audit_log[-1])

    return {
        "answer": result,
        "audit_log": audit_log
    }