from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import ChatRequestSchema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/chat")
def send_chat_message(request: ChatRequestSchema):
    return {"input": request.prompt, "output": len(request.prompt)}
