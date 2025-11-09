from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from utils.pdf_utils import parse_and_chunk_pdf
from utils.db import pdf_collection
from utils.gemini_utils import embed_content_for_file
from auth.jwt import get_current_uid

router = APIRouter()

@router.post("/fileupload/")
async def upload_file(file: UploadFile = File(...), background_tasks: BackgroundTasks = None, current_user: str = Depends(get_current_uid)):
    contents = await file.read()
    chunks = parse_and_chunk_pdf(contents, file.filename, current_user)

    if not chunks:
        return {"error": "No text extracted from PDF"}
    
    result = pdf_collection.insert_many(chunks)

    if background_tasks:
        background_tasks.add_task(embed_content_for_file, file.filename)
    else:
        embed_content_for_file(file.filename)

    return {
        "filename": file.filename,
        "uid": current_user,
        "chunks_inserted": len(result.inserted_ids),
        "success": True
    }