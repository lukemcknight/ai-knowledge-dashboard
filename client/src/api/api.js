const API_BASE_URL = "http://localhost:8000/api";

export async function sendFile(formData) {
    const response = await fetch(`${API_BASE_URL}/fileupload/`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload success:", data);

    return data;
}

export async function sendQuery(userQuery) {
    const response = await fetch(`${API_BASE_URL}/search/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
    });

    if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Search success:", data);

    return data;
}