import { request } from "./api.js";

export const login = async (email, password) => {
    return await request("/auth/login", {
        method: "GET", 
        body: {
            email: email,
            password: password
        }
    });
}