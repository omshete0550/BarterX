import axios from "axios";
import { getAccessToken } from "./accessToken";

// Set VITE_API_URL in client/.env when your API is not running on port 5000.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Every future protected request made with this client gets the saved JWT.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
