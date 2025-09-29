import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostComments, addComment } from "../api/post";
import { useAuth } from "../context/AuthContext";
import { useToggleLike } from "../hooks/useToggleLike"; // ✅ custom hook
import { Forward, Heart, MessageCircle } from "lucide-react";
import { serverURL } from "../utils/axiosInstance";

export default function PostCard({ post }) {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Use custom hook for like toggle
  const { mutate: likePost, isPending: likeLoading } = useToggleLike(post._id);

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", post._id],
    queryFn: () => fetchPostComments(post._id),
    enabled: showComments,
  });

  // Mutation for adding comment
  const { mutate: postComment, isPending } = useMutation({
    mutationFn: addComment,
    onMutate: async ({ text }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", post._id] });

      const previousComments = queryClient.getQueryData(["comments", post._id]);

      queryClient.setQueryData(["comments", post._id], (old = []) => [
        ...old,
        {
          _id: Date.now().toString(),
          text,
          user: { username: user?.username, avatar: user?.avatar },
        },
      ]);

      return { previousComments };
    },
    onError: (_err, _newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", post._id],
          context.previousComments
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comments", post._id]);
    },
  });

  const handleReply = () => {
    if (!commentText.trim()) return;
    postComment({ postId: post._id, text: commentText });
    setCommentText("");
  };

  return (
    <div className="flex flex-col gap-3 max-w-xl w-full bg-gray-200 p-4 rounded-lg shadow-md">
      {/* Author Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={post.author?.avatar || "https://i.pravatar.cc/100"}
            alt={post.author?.username || "user"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">
            {post.author?.username || "Unknown"}
          </h3>
        </div>
        <button className="text-sm px-3 py-1 border rounded-lg">Follow</button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-1 pb-2 border-b border-gray-400">
        <p className="text-sm font-normal text-gray-700">{post.content}</p>
        {/* ✅ Show image if exists */}
        {post.image && (
          <img
            src={`${serverURL}/uploads/${post.image}`}
            alt="Post"
            className="max-h-80 w-full object-cover rounded-lg shadow-md"
          />
        )}
        {post.hashtags?.map((tag, i) => (
          <span key={i} className="text-blue-600 text-xs font-semibold">
            {tag}
          </span>
        ))}
      </div>

      {/* Likes / Comments */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-400">
        <button
          onClick={() => likePost()}
          disabled={likeLoading}
          className={`text-sm font-semibold flex gap-1 items-center cursor-pointer ${
            post.likes.includes(user?.id) ? "text-red-600" : "text-gray-800"
          }`}
        >
          <Heart
            size={20}
            className={
              post.likes.includes(user?.id) ? "fill-red-600 text-red-600" : ""
            }
          />
          {post.likes.length}
        </button>

        <p
          onClick={() => setShowComments((prev) => !prev)}
          className="text-sm font-semibold flex gap-1 items-center cursor-pointer group hover:text-blue-600"
        >
          <MessageCircle
            size={20}
            className="text-gray-800 group-hover:text-blue-600"
          />
          {comments?.length ?? post.comments?.length ?? 0}
        </p>

        <p className="text-sm font-semibold cursor-pointer flex gap-1 items-center">
          <span className="text-xs font-semibold text-gray-800">share</span>
          <Forward size={20} />
        </p>
      </div>

      {/* Comment Box */}
      {user ? (
        <div className="border-b pb-2 border-gray-400 flex gap-1 items-center">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your comment.."
            className="w-full outline-none border-r border-gray-400 text-gray-500 resize-none p-1"
          />
          <button
            onClick={handleReply}
            disabled={isPending}
            className="px-2 py-1 bg-gray-800 rounded-lg text-white cursor-pointer text-center hover:bg-black disabled:opacity-50"
          >
            {isPending ? "Posting..." : "Reply"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-600">
          Please login to reply to this post.
        </p>
      )}

      {/* See Comments */}
      <button
        onClick={() => setShowComments((prev) => !prev)}
        className="text-sm text-gray-600 hover:text-blue-600 self-start cursor-pointer"
      >
        {showComments ? "Hide Comments" : "See Comments"}
      </button>

      {/* Render Comments */}
      {showComments && (
        <div className="mt-2 flex flex-col gap-2">
          {isLoading && <p className="text-xs text-gray-500">Loading...</p>}
          {isError && (
            <p className="text-xs text-red-500">Failed to load comments</p>
          )}
          {comments?.length === 0 && (
            <p className="text-xs text-gray-500">No comments yet</p>
          )}
          {comments?.map((c) => (
            <div key={c._id} className="flex gap-2 items-start">
              <img
                src={c.user?.avatar || "https://i.pravatar.cc/50"}
                alt={c.user?.username}
                className="w-6 h-6 rounded-full"
              />
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm">
                <p className="text-sm font-semibold">{c.user?.username}</p>
                <p className="text-xs text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
