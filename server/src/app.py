import openai
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema, FetchChatSchema
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
@app.post("/chats")
async def request_chatgpt(request: ChatRequestSchema):
    if request.chatId not in chats:
        chats[request.chatId] = {"messages": []}

    user_message = {
        "no": len(chats[request.chatId].get("messages", [])) + 1,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sender": "user",
        "content": request.prompt,
    }

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a supportive assistant."},
                *[
                    {"role": msg["sender"], "content": msg["content"]}
                    for msg in chats[request.chatId]["messages"]
                ],
                {"role": "user", "content": request.prompt},
            ],
            max_tokens=100,
            temperature=0.7,
        )
        assistant_message = {
            "no": len(chats[request.chatId].get("messages", [])) + 2,
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "sender": "assistant",
            "content": response["choices"][0]["message"]["content"].strip(),
            # "content": "THIS IS THE TEST",
        }

        chats[request.chatId]["messages"].append(user_message)
        chats[request.chatId]["messages"].append(assistant_message)

        return {"messages": chats[request.chatId]["messages"]}
    except Exception as e:
        print(f"Error communication with OpenAI: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI")


@app.post("/chats/{chatId}/summarize")
async def summarize_chat_topic(chatId: str):
    if chatId not in chats or not chats[chatId]["messages"]:
        raise HTTPException(
            status_code=404, detail="Chat not found or no messages available"
        )
    try:
        topic_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Summarize the topic of this conversation in one short sentence.",
                },
                *[
                    {"role": msg["sender"], "content": msg["content"]}
                    for msg in chats[chatId]["messages"]
                ],
            ],
            max_tokens=50,
            temperature=0.5,
        )
        chat_topic = topic_response["choices"][0]["message"]["content"].strip()
        chats[chatId]["topic"] = chat_topic

        return {"topic": chat_topic}
    except Exception as e:
        print(f"Error communicating with OpenAI: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI")


@app.post("/fetch")
def fetchChat(request: FetchChatSchema):
    print("Hello")
    try:
        return {"messages": chats[request.chatId]["messages"]}
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Chat ID {request.chatId} not found"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI")
