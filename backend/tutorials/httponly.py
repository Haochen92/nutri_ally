from fastapi import FastAPI, Depends, HTTPException, status, Request, Response
from typing import Annotated
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import jwt
from database import engine, UserData
from sqlmodel import Session

app = FastAPI()

## Configuration for access & refresh token generation for JWT
SECRET_KEY = "path/to/secretkey"
ALGORITHM = "HS256" # Standard Algo for symmetrical key
ACCESS_TOKEN_EXPIRE_MINUTES = 10
REFRESH_TOKEN_EXPIRE_DAYS = 3 

# Creating Password Context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Creating User Model and Token Model
class User(BaseModel):
    name: str

class Token(BaseModel):
    access_token: str
    token_type: str = "Bearer" # Default to the industry standard type

def get_session():
    with Session(engine) as session:
        yield session

# Password hashing utility
def hash_password(password: str):
    return pwd_context.hash(password)

## 0. Creating User Account 
@app.post("/api/signup")
async def create_account(
    session: Annotated[Session, Depends(get_session)],
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user_name, password = form_data.username, hash_password(form_data.password)
    new_user = UserData(name=user_name, password=password)
    session.add(new_user)
    session.commit()
    return {"message": "Account Created Successfully"}
    

## 1. Validate User Credentials and Create Access token

# Login endpoint
@app.post("/api/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    response: Response,
    session: Annotated[Session, Depends(get_session)]
):
    # Authenticate user
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    
    # Create Access token
    update_tokens(user.name, response, session)
    
    return {"message": "Login Successful"}
    
    
# Authenticate user function
def authenticate_user(username: str, password: str, session: Session):
    user_data = session.get(UserData, username)
    if not user_data or not pwd_context.verify(password, user_data.password):
        return None
    return User(**user_data.dict())

# Create Access token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()  # Creates a copy to prevent mutating the original data
    expiry_date = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expiry_date})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Insert Cookie to response
def set_response(response: Response, key: str, token: str) -> None:
    response.set_cookie(
        key=key,
        value=token,
        httponly=True,
        secure=True,
        samesite="Strict"
    )

def update_tokens(username: str, response: Response, session: Session):
    payload_data = {"sub": username}
    access_token = create_access_token(payload_data, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_access_token(payload_data, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    
    # Set cookies
    set_response(response, "access_token", access_token)
    set_response(response, "refresh_token", refresh_token)
    
    # Store refresh token in the database
    user_data = session.get(UserData, username)
    user_data.refresh_token = refresh_token
    session.add(user_data)
    session.commit()

## 2. Accessing protected endpoint via token
async def get_current_user(
    request: Request,
    session: Annotated[Session, Depends(get_session)]
):
    access_token = request.cookies.get("access_token")
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized")
    
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        # Validate that user exists in database 
        user_data = session.get(UserData, username)
        if not user_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user")
        return User(**user_data.dict())
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    

# Creating a protected endpoint which depends on validation 
@app.get("/api/protected_name")
async def get_name(current_user: User = Depends(get_current_user)):
    return {"message": f"Hello, {current_user.name}, enjoy your day!"}


## 3. Implement Refresh token logic 
@app.post("/api/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    session: Annotated[Session, Depends(get_session)]
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized")
    
    try: 
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        # Retrieve user and verify refresh token
        user_data = session.get(UserData, username)
        if not user_data or user_data.refresh_token != refresh_token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="expired refresh_token")
        
        # Update tokens and set cookies in response
        update_tokens(username, response, session)
        return {"message": "Token refreshed Successfully"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
