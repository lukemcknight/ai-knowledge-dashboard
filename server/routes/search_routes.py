from fastapi import APIRouter, UploadFile, File
from utils.pdf_utils import parse_and_chunk_pdf
from utils.db import pdf_collection
from pydantic import BaseModel
from utils.search_utils import search_and_answer

router = APIRouter()

class Text(BaseModel):
    query: str

@router.post("/search/")
async def search(text: Text):
   answer = search_and_answer(text.query)
   return {"answer": answer}