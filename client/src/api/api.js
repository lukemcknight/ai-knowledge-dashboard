const API_BASE_URL = "http://localhost:8000/api";

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProtectedData = async () => {
    const res = await fetch(`${API_BASE_URL}/protected`, {
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
}