from utils.db import pdf_collection

async def find_articles(uid):
    files = []
    try:
        for doc in pdf_collection.find({}):
            if doc['filename'] in files:
                continue
            else:
                if doc['uid'] == uid:
                    files.append(doc['filename'])
    except Exception as e:
        print(e)
    return files