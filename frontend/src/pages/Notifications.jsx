import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/notification";
import { useNotifications } from "../context/NotificationContext";
import { Link } from "react-router-dom";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";

export default function NotificationsPage() {
  // Fetch stored notifications from backend
  const { data: serverNotifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  // Realtime notifications (from socket)
  const { notifications: liveNotifications } = useNotifications();

  // Merge live + server
  const allNotifications = [
    ...(liveNotifications || []),
    ...(serverNotifications || []),
  ];

  if (isLoading) {
    return (
      <div className="p-4 text-gray-600 text-center">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-blue-500" /> Notifications
      </h2>

      {allNotifications.length === 0 ? (
        <p className="text-gray-600">No notifications yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {allNotifications.map((notif) => (
            <div
              key={notif._id}
              className="flex items-center gap-3 bg-white shadow-sm p-3 rounded-lg border"
            >
              {/* Icon by type */}
              {notif.type === "like" && (
                <Heart className="text-red-500" size={20} />
              )}
              {notif.type === "comment" && (
                <MessageCircle className="text-green-500" size={20} />
              )}
              {notif.type === "follow" && (
                <UserPlus className="text-blue-500" size={20} />
              )}

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notif.sender?.username || "Someone"}
                  </span>{" "}
                  {notif.type === "like" && "liked your post"}
                  {notif.type === "comment" && "commented on your post"}
                  {notif.type === "follow" && "started following you"}
                </p>

                {/* Links to post or profile */}
                {notif.post && (
                  <Link
                    to={`/posts/${notif.post._id || notif.post}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Post
                  </Link>
                )}
                {notif.type === "follow" && notif.sender && (
                  <Link
                    to={`/users/${notif.sender._id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
