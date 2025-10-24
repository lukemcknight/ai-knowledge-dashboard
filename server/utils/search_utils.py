from utils.gemini_utils import gemini_client
from utils.db import collection

def embed_query(query: str):
    response = gemini_client.models.embed_content(
        model="text-embedding-004",
        contents=query
    )
    return response.embeddings[0].values

def search_and_answer(user_query, top_k=5):
    query_embedding = embed_query(user_query)

    results = collection.aggregate([
        {
            "$vectorSearch": {
                "queryVector": query_embedding,
                "path": "embedding",
                "limit": top_k,
                "numCandidates": 50,
                "index": "vector_index"
            }
        }
    ])

    context = "\n\n".join(r["text"] for r in results)

    prompt = f"Context:\n{context}\n\nQuestion: {user_query}"
    response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return response.text