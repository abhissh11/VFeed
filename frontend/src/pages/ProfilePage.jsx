// src/pages/ProfilePage.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { fetchUserConnections, fetchUserPosts } from "../api/user";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { PenLine } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch user connections (followers & following)
  const {
    data: connections,
    isLoading: loadingConnections,
    isError: errorConnections,
  } = useQuery({
    queryKey: ["connections", user?.id],
    queryFn: () => fetchUserConnections(user.id),
    enabled: !!user,
  });

  // Fetch user posts (using new controller)
  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useQuery({
    queryKey: ["userPosts", user?.id],
    queryFn: () => fetchUserPosts(user.id),
    enabled: !!user,
  });

  if (!user) return <p className="pt-20 text-center">Please login first.</p>;
  if (loadingConnections || loadingPosts)
    return <p className="pt-20 text-center">Loading...</p>;
  if (errorConnections || errorPosts)
    return (
      <p className="pt-20 text-center text-red-500">
        Failed to load profile. Try Refreshing
      </p>
    );

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4 pb-20">
      {/* Profile Header */}
      <div className="bg-gray-200 p-4 rounded-xl shadow-md flex items-center gap-4 mb-6 pb-4">
        <img
          src={
            user.avatar || "https://ui-avatars.com/api/?name=" + user.username
          }
          alt={user.username}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-700">
            <span>{connections?.followers?.length || 0} Followers</span>
            <span>{connections?.following?.length || 0} Following</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => navigate("/create-post")}
            className="px-4 py-2 bg-black hover:bg-blue-500 text-white rounded-lg cursor-pointer flex gap-1 items-center"
          >
            Create Post <PenLine />
          </button>
        </div>
      </div>

      {/* User Posts */}
      <div className="flex flex-col gap-4">
        {posts?.length > 0 ? (
          posts.map((p) => <PostCard key={p._id} post={p} />)
        ) : (
          <p className="text-gray-600">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
