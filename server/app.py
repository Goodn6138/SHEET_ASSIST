from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow requests from anywhere – including Google Apps Script)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to *.googleusercontent.com
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class EchoRequest(BaseModel):
    message: str

# Optional root endpoint for basic health check
@app.get("/")
def root():
    return {"message": "FastAPI server is live!"}

# POST endpoint to reverse the message
@app.post("/echo-reverse")
def echo_reverse(data: EchoRequest):
    reversed_message = data.message[::-1]
    return {"reversed": reversed_message}
