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

export const signup = async (username, email, password) => {
    return await request("/auth/signup", {
        method: "POST",
        body: {
            username : username,
            email : email,
            password : password
        }
    });
}