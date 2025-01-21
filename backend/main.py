from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import GameResult

app = FastAPI()

#Configuracion de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 

# Datos simulados en memoria
users = { "test@test.com": {"password": "1234", "highscore": 0} }
scores = []


@app.get("/")
async def read_root():
    return {"message": "Fast API corriendo!"}

@app.post("/login")
def login(email: str, password: str):
    if email in users and users[email]["password"] == password:
        return {"message": "Login successful", "email": email}
    raise HTTPException(stattus_code=401, detail="Invalid credentials")

@app.post("/score")
def submit_score(email: str, score: int):
    if email in users:
        if score > users[email]["highscore"]:
            users[email]["highscore"] = score
        scores.append({"email": email, "score": score})
        return {"message": "Score submitted", "score": score}
    raise HTTPException(status_code=400, detail="User not found")

@app.get("/scores")
def get_scores():
    return scores