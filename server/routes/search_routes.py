from fastapi import APIRouter, Request, UploadFile, File
from utils.pdf_utils import parse_and_chunk_pdf
from utils.db import pdf_collection
from pydantic import BaseModel
from utils.search_utils import search_and_answer
from auth.jwt import get_current_uid

router = APIRouter()

class Text(BaseModel):
    query: str

@router.post("/search/")
async def search(text: Text, request: Request):
   auth_header = request.headers.get("authorization")
   uid = get_current_uid(auth_header)
   answer = search_and_answer(text.query, uid)
   return {"answer": answer}