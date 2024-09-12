import openai
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema

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


############

# Endpoints

############


# Root endpoint to check if the server is running
@app.get("/")
def read_root():
    return {"Hello": "World"}


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
