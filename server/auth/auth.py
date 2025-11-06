from fastapi import APIRouter, HTTPException, Depends
from passlib.hash import argon2
from pydantic import BaseModel
from auth.jwt import create_jwt
from utils.db import users_collection
import uuid

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: LoginRequest):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = argon2.hash(user.password)
    user_uuid = str(uuid.uuid4())
    users_collection.insert_one({"uuid": user_uuid, "email": user.email, "password_hash": hashed_pw})
    token = create_jwt(user.email)
    return {"token": token}

@router.post("/login")
def login(user: LoginRequest):
    found = users_collection.find_one({"email": user.email})
    if not found or not argon2.verify(user.password, found["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_jwt(user.email)
    return {"token": token}
