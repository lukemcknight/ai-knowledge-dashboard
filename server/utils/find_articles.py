from utils.db import collection

async def find_articles():
    files = []
    try:
        for doc in collection.find({}):
            if doc['filename'] in files:
                continue
            else:
                files.append(doc['filename'])
    except Exception as e:
        print(e)
    return files