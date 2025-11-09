from fastapi import APIRouter, Request
from utils.find_articles import find_articles
from auth.jwt import get_current_uid

router = APIRouter()

@router.get("/articlefind/")
async def articlefind(request: Request):
   auth_header = request.headers.get("authorization")
   uid = get_current_uid(auth_header)
   print("uid: ", uid)
   response = await find_articles(uid)
   return response