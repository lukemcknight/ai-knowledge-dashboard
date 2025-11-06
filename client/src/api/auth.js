const API_BASE_URL = "http://localhost:8000/api";

export const login = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        return data.token;
    }
    return null;
}

export const signup = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        console.log(data.token)
        return data.token;
    }
    return null;
}