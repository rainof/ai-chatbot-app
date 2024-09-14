from pydantic import BaseModel


class ChatRequestSchema(BaseModel):
    chatId: str
    prompt: str
