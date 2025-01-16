from fastapi import FastAPI
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


@app.get("/")
async def read_root():
    return {"message": "Fast API corriendo!"}


@app.get("/tips")
def get_tips():
    tips = [
        "Revisa el estado de los neumáticos.",
        "Usa siempre el cinturón de seguridad."
    ]
    return {"tips": tips}


@app.post("/results")
def post_results(result: GameResult):
    return {"message": "Resultados recibidos", "result": result}


@app.get("/certificate/{player_name}")
def generate_certificate(player_name: str):
    return {"message":f"Certificado para {player_name}"}

