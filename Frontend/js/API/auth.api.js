import { request } from "./api.js";

export const login = async (email, password) => {
    return await request("/auth/login", {
        method: "POST", 
        body: {
            email: email,
            password: password
        }
    });
}