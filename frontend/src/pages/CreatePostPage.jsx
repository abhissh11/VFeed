// src/pages/CreatePostPage.jsx
import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const { submitPost, isPending } = useCreatePost({ redirect: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost(content, image);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg border border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>

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
      </div>
    </div>
  );
}
