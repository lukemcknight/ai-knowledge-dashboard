from utils.db import collection

result = collection.delete_many({})
print(f"Deleted {result.deleted_count} documents")