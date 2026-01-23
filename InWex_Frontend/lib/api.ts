import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.inwex.tech",
    headers: {
        "Content-Type": "application/json",
    }
})