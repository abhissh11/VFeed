import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAll } from "../api/search";
import { Link } from "react-router-dom";

export default function SearchSidebar() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchAll(query),
    enabled: !!query, // ✅ run only if query is not empty
  });

  return (
    <aside className="col-span-3 bg-gray-100 rounded-xl shadow-md p-4 flex flex-col gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for user or posts.."
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search Results */}
      {isLoading && <p className="text-sm text-gray-500">Searching...</p>}

      {query && data && (
        <div className="flex flex-col gap-4">
          {/* Users */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Users</h3>
            {data.users.length === 0 ? (
              <p className="text-sm text-gray-500">No users found</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {data.users.map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm"
                  >
                    <img
                      src={user.avatar || "https://i.pravatar.cc/50"}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm">{user.username}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Posts */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Posts</h3>
            {data.posts.length === 0 ? (
              <p className="text-sm text-gray-500">No posts found</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {data.posts.map((post) => (
                  <li
                    key={post._id}
                    className="p-2 bg-white rounded-md shadow-sm text-sm"
                  >
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {post.content.slice(0, 60)}...
                    </Link>
                    <p className="text-xs text-gray-500">
                      by {post.author.username}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {!query && (
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-semibold text-lg mb-2">
            Hello Viewer, Hire or Collaborate with me
          </h2>
          <p className="text-sm text-gray-600">
            Actively looking for Internship and job, fulltime or part-time.
          </p>
          <Link to="https://abhish.tech" target="_blank">
            <button className="text-base font-semibold px-4 py-2 rounded-lg bg-black cursor-pointer hover:bg-gray-800 text-white">
              Visit my Profile
            </button>
          </Link>
        </div>
      )}
    </aside>
  );
}
