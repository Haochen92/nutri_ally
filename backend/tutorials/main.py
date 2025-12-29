from fastapi import FastAPI, Form, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, datetime, timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import jwt
from . import items
from pydantic_settings import BaseSettings, SettingsConfigDict


app = FastAPI()
app.include_router(items.router)

class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50

    model_config = SettingsConfigDict(env_file=".env")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")
SECRET_KEY = "api.key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 10

origins = [
    "https://liuhaochen.com",
]

class Item(BaseModel):
    id: int 
    name: str | None = None
    description: str | None = None
    price: str | None = None
    

@app.get("/{item_id}")
def get_items(item_id: int):
    return Item(id = item_id)