import openai
import os
from fastapi import FastAPI
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


# Root endpoint to check if the server is running
@app.get("/")
def read_root():
    return {"Hello": "World"}


# Endpoint to start a new chat
@app.post("/start-chat")
def start_chat():
    chat_id = str(uuid4())
    chats[chat_id] = []
    return {"chatId": chat_id}


# Endpoint to send a prompt to ChatGPT and get a response, saving it to chat history
@app.post("/chat-test")
def test_response(request: ChatRequestSchema):
    chat_id = request.chatId
    prompt = request.prompt
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    return {"chatId": chat_id, "response": f"Test response to prompt: {request.prompt}"}


# Endpoint to get chat history by chat id
@app.get("/chat-test/{chat_id}")
def get_chat_history(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    print(f"Returning chat history for chat_id: {chat_id}")
    print(chats[chat_id])
    return {"chatId": chat_id, "messages": chats[chat_id]}


# Endpoint to send a prompt to ChatGPT and get a response
@app.post("/chat")
async def request_chatgpt(request: ChatRequestSchema):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a supportive assistant."},
            {"role": "user", "content": request.prompt},
        ],
        max_tokens=100,
        temperature=0.7,
    )
    message = response["choices"][0]["message"]["content"].strip()
    return {"response": message}
