import API, { PrivateAPI } from "../utils/axiosInstance";

// Fetch connections
export const fetchUserConnections = async (userId) => {
  const { data } = await PrivateAPI.get(`/users/${userId}/connections`);
  return data;
};

// Fetch posts by author
export const fetchUserPosts = async (userId) => {
  const { data } = await PrivateAPI.get(`/posts/author/${userId}`);
  return data;
};
