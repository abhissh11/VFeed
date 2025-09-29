import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchPostsByHashtag } from "../api/post";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import SearchSidebar from "../components/SearchSidebar";

export default function Feed() {
  const [selectedTag, setSelectedTag] = useState(null);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", selectedTag],
    queryFn: () =>
      selectedTag ? fetchPostsByHashtag(selectedTag) : fetchPosts(),
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Something went wrong while fetching posts.</p>;

  return (
    <div className="grid grid-cols-12 gap-4 h-screen px-6 py-4 pt-20">
      {/* Left Sidebar */}
      <Sidebar onSelectTag={setSelectedTag} />

      {/* Center Feed */}
      <main className="col-span-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm">No posts for this tag.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </main>

      {/* Right Sidebar */}
      <SearchSidebar />
    </div>
  );
}
