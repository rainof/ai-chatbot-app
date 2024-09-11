from pydantic import BaseModel


class ChatRequestSchema(BaseModel):
    prompt: str
