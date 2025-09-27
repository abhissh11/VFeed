import axios from "axios";
import { PrivateAPI } from "../utils/axiosInstance";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchPosts = async () => {
  const { data } = await API.get("/posts");
  return data;
};

export const fetchPostComments = async (postId) => {
  const { data } = await API.get(`/posts/${postId}/comments`);
  return data;
};

export const addComment = async ({ postId, text }) => {
  const { data } = await PrivateAPI.post(`/posts/${postId}/comment`, { text });
  return data;
};

export const toggleLike = async (postId) => {
  const { data } = await API.put(`/posts/${postId}/like`);
  return data;
};
