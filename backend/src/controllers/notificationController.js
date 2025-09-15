import Notification from "../models/Notification.js";

// Get user notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.userId })
      .populate("sender", "username avatar")
      .populate("post", "content")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as read
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
