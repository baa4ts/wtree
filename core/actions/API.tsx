import { secureStore } from "@/helpers/secureStore";
import axios from "axios";


export const API = axios.create({
    baseURL: "https://wtree.vercel.app/api"
})

API.interceptors.request.use(
    async (config) => {
        const token = await secureStore.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
