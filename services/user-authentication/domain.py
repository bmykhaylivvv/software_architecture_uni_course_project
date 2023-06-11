from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class JWTToken(BaseModel):
    token: str
