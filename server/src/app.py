import openai
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema
from uuid import uuid4


# Dictionary to store chat history for each user
chats = {}

# Initialize FastAPI application
app = FastAPI()

# Add CORS middleware to allow the frontend (localhost:3000) to interact with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API key from a file and set it for API requests
with open("openai_api_key.txt", "r") as file:
    api_key = file.read().strip()
openai.api_key = api_key


################################################
# Endpoints
################################################


# Endpoint to start a new chat
@app.post("/new-chat")
def new_chat():
    chat_id = str(uuid4())
    return {"chatId": chat_id}


@app.get("/chats/{chat_id}")
def get_chat(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    print(f"Returning chat history for chat_id:", {chat_id})
    print("Chat:", chats(chat_id))

    return {"chatId": chat_id, "messages": chats[chat_id]}
