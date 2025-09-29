import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/post";
import PostCard from "../components/PostCard";

export default function PostDetailPage() {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  if (isLoading) return <p className="p-6">Loading post...</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load post.</p>;

  return (
    <div className="flex justify-center pt-20">
      <PostCard post={post} />
    </div>
  );
}
