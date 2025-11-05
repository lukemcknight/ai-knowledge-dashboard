from fastapi import APIRouter, UploadFile, File
from utils.find_articles import find_articles

router = APIRouter()

@router.get("/articlefind/")
async def articlefind():
   response = await find_articles()
   return response