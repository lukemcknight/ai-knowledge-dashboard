import certifi
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
client = client = MongoClient(
    MONGO_URI,
    tlsCAFile=certifi.where()
)
db = client["ai_dashboard"]
collection = db["pdf_chunks"]