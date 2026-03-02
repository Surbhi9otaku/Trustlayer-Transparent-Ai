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

class UserInput(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "TrustLayer Backend Running"}

@app.post("/analyze")
def analyze(input: UserInput):
    return {
        "response": f"AI processed: {input.text}",
        "confidence": 0.89,
        "explanation": "This response is generated using a demo logic model.",
        "risk": "Low"
    }