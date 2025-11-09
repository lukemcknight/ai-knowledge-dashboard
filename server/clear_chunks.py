from utils.db import pdf_collection

result = pdf_collection.delete_many({})
print(f"Deleted {result.deleted_count} documents")