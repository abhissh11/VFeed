import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (credentials) => {
  const { data } = await API.post("/auth/register", credentials);
  return data;
};
