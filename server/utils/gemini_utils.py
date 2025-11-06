from google import genai
import os
from dotenv import load_dotenv
from utils.db import pdf_collection

load_dotenv()

gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_embedding(text: str):
    response = gemini_client.models.embed_content(
        model="text-embedding-004",
        contents=text
    )
    return response.embeddings[0].values

def embed_content_for_file(filename):
    try:
        docs = pdf_collection.find({ "filename": filename, "embedding": { "$exists": False } })
        
        for doc in docs:
            embedding_vector = generate_embedding(doc['text'])
            
            pdf_collection.update_one(
                {"_id": doc["_id"]},
                {"$set": {"embedding": embedding_vector}}
            )
            
            print(f"Embedded chunk {doc['_id']}")
    
    except Exception as db_error:
        print(f"Database error: {str(db_error)}")
        return {"error": f"Failed to store in database: {str(db_error)}"}


