from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import auth, credentials, initialize_app
from fastapi.security import OAuth2PasswordBearer

from security import create_access_token, decode_token
from models import UserLogin, Token

app = FastAPI()

#Configuracion de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 

# Inicializar firebase admin sdk
cred = credentials.Certificate("/backend/firebase-adminsdk.json")
initialize_app(cred)

# Define OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Datos simulados en memoria
users = { "test@test.com": {"password": "1234", "highscore": 0} }
scores = []


@app.get("/")
async def read_root():
    return {"message": "Fast API is running!"}

@app.post("/login")
def login(user: UserLogin):
    try:
        user_data = auth.get_user_by_email(user.email)
        auth.verify_password(user.password, user.email)
        access_token = create_access_token(data={"sub": user.email})
        return {"access__token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Credencials are not valid.")

@app.get("/validate-user")
def validate_user(token: str = Depends(oauth2_scheme)):
    try:
        result = decode_token(token)
        if result["status"] == "ok":
            return{"status": "ok", "message": f"Welcome, {result['detail']}"}
        else:
            raise HTTPException(status_code=401, detail="Token is not valid")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token is not valid")  
    
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