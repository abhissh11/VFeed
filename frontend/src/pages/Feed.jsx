// src/pages/Feed.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/post";
import PostCard from "../components/PostCard";

export default function Feed() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Something went wrong while fetching posts.</p>;

  return (
    <div className="grid grid-cols-12 gap-4 h-screen px-6 py-4 pt-20">
      {/* Left Sidebar */}
      <aside className="col-span-3 bg-gray-100 rounded-xl shadow-md p-4 flex flex-col gap-4">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Post
        </button>
        <div>
          <h2 className="font-semibold text-lg mb-2">Tags</h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <li>#AI</li>
            <li>#WebDev</li>
            <li>#MERN</li>
            <li>#React</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Notifications</h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <li>You have 3 new likes</li>
            <li>New follower: Radhe</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Profile</h2>
          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Abhishek"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm font-medium">Abhishek</p>
          </div>
        </div>
      </aside>

      {/* Center Feed */}
      <main className="col-span-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="col-span-3 bg-gray-100 rounded-xl shadow-md p-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <h2 className="font-semibold text-lg mb-2">Coming Soon</h2>
          <p className="text-sm text-gray-600">
            Add static widgets here later...
          </p>
        </div>
      </aside>
    </div>
  );
}
