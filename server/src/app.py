import openai
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema
from uuid import uuid4
import datetime


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


# @app.get("/chats/{chat_id}")
# def get_chat(chat_id: str):
#     if chat_id not in chats:
#         raise HTTPException(status_code=404, detail="Chat not found")

#     print(f"Returning chat history for chat_id:", {chat_id})
#     print("Chat:", chats[chat_id])

#     return {"chatId": chat_id, "messages": chats[chat_id]}

@app.post("/chats/{chat_id}")
async def request_chatgpt(request: ChatRequestSchema):

    user_message = {
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sender": "user",
        "content": request.prompt
    }
    if request.chatId not in chats:
    #     raise HTTPException(status_code=404, detail="Chat not found")
        chats[request.chatId] = [user_message]
    else:
        chats[request.chatId].append(user_message)
    print(chats)
    print("kkkkkkk")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a supportive assistant."},
                {"role": "user", "content": request.prompt},
            ],
            max_tokens=100,
            temperature=0.7,
        )
        assistant_message = {
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "sender": "assistant",
            "content": response["choices"][0]["message"]["content"].strip()
        }
        print("===")
        print(request.chatId)
        print("===")
        chats[request.chatId].append(assistant_message)
        print("-->", chats[request.chatId])
        print()
        return {"response": assistant_message["content"]}
    except Exception as e:
        print(f"Error communication with OpenAI: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI")