from utils.gemini_utils import gemini_client
from utils.db import pdf_collection

def embed_query(query: str):
    response = gemini_client.models.embed_content(
        model="text-embedding-004",
        contents=query
    )
    return response.embeddings[0].values

def search_and_answer(user_query, uid, top_k=5):
    query_embedding = embed_query(user_query)
    print("query_embedding length:", len(query_embedding))
    print("pdf_collection:", pdf_collection)

    try:    
        results = list(pdf_collection.aggregate([
            {
                "$vectorSearch": {
                    "queryVector": query_embedding,
                    "path": "embedding",
                    "limit": top_k,
                    "numCandidates": 50,
                    "index": "vector_index"
                }
            },
            {"$match": {"uid": uid}}
        ]))
        print("UID used for search:", uid)
        print("Number of results:", len(results))
        print("First result:", results[0] if results else "No results")
    except Exception as e:
        print("Aggregation error:", e)
        return


    context = "\n\n".join(r["text"] for r in results)

    prompt = f"Context:\n{context}\n\nQuestion: {user_query}"
    print(prompt)
    response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return response.text