from pydantic import BaseModel

class GameResult(BaseModel):
    """Model for Results"""
    player_name: str
    scrore: int

class UserLogin(BaseModel):
    """Model for Login"""
    email: str
    password: str

class Token(BaseModel):
    """Model for Token"""
    access_token: str
    token_type: str