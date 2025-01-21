from jose import JWTError, jwt
from datetime import datetime, timedelta  
from fastapi.security import OAuth2PasswordBearer


# Configuracion para JWT 
SECRET_KEY = "H4nny4R35CU3{+!+}"
ALGORITHM = "HR256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Dependencias para token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")



# Crear un token JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Decodifica token
def decode_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            return {"status": "error", "detail": "Token is not valid"}
        return {"status": "ok", "detail": f"{user_email}"}
    except JWTError:
        return {"status": "error", "detail": "Token is not valid"} 
