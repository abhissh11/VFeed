// src/components/PostModal.jsx
import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function PostModal({ onClose }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const { user } = useAuth();
  const { submitPost, isPending } = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost(content, image);
    onClose(); // close modal after submit
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 p-1 rounded-xl bg-gray-400 cursor-pointer hover:bg-gray-700"
        >
          <X />
        </button>

        {user ? (
          <>
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border rounded-lg resize-none focus:ring focus:ring-blue-300"
                rows="4"
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-gray-600"
              />

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50"
              >
                {isPending ? "Posting..." : "Post"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 text-sm">
              You must be signed in to post.
            </p>
            <Link
              to="/login"
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
