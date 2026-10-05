const API_URL = "http://localhost:3000";

export const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : options.token ? `Bearer ${options.token}` : undefined
        },
        body: options.body ? JSON.stringify(options.body) : null        
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}