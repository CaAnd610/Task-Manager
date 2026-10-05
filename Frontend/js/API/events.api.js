import { request } from "./api.js";

export const getEvents = async (token) => {
    return await request("/events", {
        method: "GET",
        token: token
    })
}