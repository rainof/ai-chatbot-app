import openai
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema
from uuid import uuid4
import datetime
from collections import defaultdict as ddict


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
with open("../openai_api_key.txt", "r") as file:
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


# Endpoint to process user input and retrieve chat history from ChatGPT API
@app.post("/chats/{chat_id}")
async def request_chatgpt(request: ChatRequestSchema):
    if request.chatId not in chats:
        chats[request.chatId] = {"messages": []}

    user_message = {
        "no": len(chats.get(request.chatId, [])) + 1,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sender": "user",
        "content": request.prompt
    }

    try:
        # response = openai.ChatCompletion.create(
        #     model="gpt-3.5-turbo",
        #     messages=[
        #         {"role": "system", "content": "You are a supportive assistant."},
        #         {"role": "user", "content": request.prompt},
        #     ],
        #     max_tokens=100,
        #     temperature=0.7,
        # )
        assistant_message = {
            "no": len(chats.get(request.chatId, [])) + 2,
            "timestamp": datetime.datetime.now(). strftime("%Y-%m-%d %H:%M:%S"),
            "sender": "assistant",
            # "content": response["choices"][0]["message"]["content"].strip()
            "content": "THIS IS THE TEST"
        }

        chats[request.chatId]["messages"].append(user_message)
        chats[request.chatId]["messages"].append(assistant_message)

        print("===")
        print(request.chatId)
        print("===")
        print()
        print(chats)
        print(">>>", len(chats[request.chatId]["messages"]))
        return {"id": request.chatId, "messages": chats[request.chatId]["messages"]}
    except Exception as e:
        print(f"Error communication with OpenAI: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI")