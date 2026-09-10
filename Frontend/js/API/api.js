const API_URL = "http://localhost:3000";

export const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: options.body ? JSON.stringify(options.body) : null        
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error en la solicitud");
    }

    return data;
}