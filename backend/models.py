from pydantic import BaseModel

class GameResult(BaseModel):
    """Model for Results"""

    player_name: str
    scrore: int