import axios from "axios";

import { SecureStorageAdapter } from "@/helpers/secureStore";

export const API = axios.create({
  baseURL: "https://wtree.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const token = await SecureStorageAdapter.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
