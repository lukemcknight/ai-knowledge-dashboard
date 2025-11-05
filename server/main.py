from fastapi import FastAPI
from routes.upload_routes import router as upload_router
from routes.search_routes import router as search_router
from routes.find_articles_route import router as article_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],    
)

app.include_router(upload_router, prefix="/api", tags=["upload"])
app.include_router(search_router, prefix="/api", tags=["upload"])
app.include_router(article_router, prefix="/api", tags=["upload"])




