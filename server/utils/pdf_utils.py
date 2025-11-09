from io import BytesIO
import fitz

CHUNK_SIZE = 1000
OVERLAP = 100

def parse_and_chunk_pdf(file_bytes, filename, uid):
    pdf_stream = BytesIO(file_bytes)
    
    try:
        doc = fitz.open(stream=pdf_stream, filetype="pdf")
    except Exception as e:
        raise ValueError("Cannot open PDF stream") from e

    chunks = []

    for page_number, page in enumerate(doc, start=1):
        page_text = page.get_text()
        start = 0
        chunk_index = 0

        while start < len(page_text):
            chunk_text = page_text[start:start + CHUNK_SIZE]
            chunks.append({
                "text": chunk_text,
                "uid": uid,
                "filename": filename,
                "page_number": page_number,
                "chunk_index": chunk_index
            })
            start += CHUNK_SIZE - OVERLAP
            chunk_index += 1

    doc.close()
    return chunks

