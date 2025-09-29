import API from "../utils/axiosInstance";

// GET /api/search?query=xyz
export const searchAll = async (query) => {
  if (!query) return { users: [], posts: [] }; // safeguard
  const { data } = await API.get(`/search?query=${query}`);
  return data;
};
