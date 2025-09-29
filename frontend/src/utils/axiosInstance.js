import axios from "axios";

export const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT token on each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

export const PublicAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const PrivateAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Attach JWT to Private API only
PrivateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
