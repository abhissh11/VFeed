import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext"; // ✅ import

export default function Header() {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications(); // ✅ live notifications
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex px-10 py-2 shadow-lg fixed w-screen justify-between items-center z-50 bg-white">
      {/* Logo / Brand */}
      <div>
        <h1 className="text-xl font-bold text-pink-600">
          V<span className="text-blue-600">Feed</span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex gap-8 items-center">
        <ul className="flex gap-6 items-center">
          <Link to="/" className="text-sm font-normal text-gray-800">
            Home
          </Link>
          <Link to="/feed" className="text-sm font-normal text-gray-800">
            Feed
          </Link>

          {/* Notifications */}
          {user && (
            <Link
              to="/notifications"
              className="relative text-sm font-normal text-gray-800"
            >
              Notifications
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </Link>
          )}
        </ul>

        {/* Right Button */}
        {user ? (
          <button
            onClick={handleLogOut}
            className="text-sm font-semibold bg-blue-500 hover:bg-red-600 cursor-pointer px-6 py-2 rounded-lg text-white"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="text-sm font-semibold bg-blue-500 hover:bg-blue-600 cursor-pointer px-6 py-2 rounded-lg text-white">
              Signin
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
