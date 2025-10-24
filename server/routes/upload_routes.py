from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from utils.pdf_utils import parse_and_chunk_pdf
from utils.db import collection
from utils.gemini_utils import embed_content_for_file

router = APIRouter()

@router.post("/fileupload/")
async def upload_file(file: UploadFile = File(...), background_tasks: BackgroundTasks = None):
    contents = await file.read()
    chunks = parse_and_chunk_pdf(contents, file.filename)

    if not chunks:
        return {"error": "No text extracted from PDF"}
    
    result = collection.insert_many(chunks)

    if background_tasks:
        background_tasks.add_task(embed_content_for_file, file.filename)
    else:
        embed_content_for_file(file.filename)

    return {
        "filename": file.filename,
        "chunks_inserted": len(result.inserted_ids),
        "success": True
    }