const API_BASE_URL = "http://localhost:8000/api";

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export async function sendFile(formData) {
    const response = await fetch(`${API_BASE_URL}/fileupload/`, {
        method: "POST",
        headers: {
            ...getAuthHeader()
        },
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
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify({ query: userQuery }),
    });

    if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Search success:", data);

    return data;
}

export async function getArticles() {
    const response = await fetch(`${API_BASE_URL}/articlefind/`, {
        method: "GET",
        headers: getAuthHeader()
    })

    if (!response.ok) {
        throw new Error(`Couldn't find articles: ${response.statusText}`)
    }

    const data = await response.json();
    console.log("Found articles", data);

    return data;
}