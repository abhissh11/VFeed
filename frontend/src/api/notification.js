import API from "../utils/axiosInstance";

// Fetch all notifications for the logged-in user
export const fetchNotifications = async () => {
  const { data } = await API.get("/notifications");
  return data;
};
