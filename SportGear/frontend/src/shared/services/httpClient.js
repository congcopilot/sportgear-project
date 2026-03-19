import axios from "axios";
import { loadStoredAuth } from "../utils/tokenStorage";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000
});

httpClient.interceptors.request.use((config) => {
  const { token } = loadStoredAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
