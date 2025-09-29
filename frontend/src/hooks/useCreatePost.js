// src/hooks/useCreatePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";

export function useCreatePost({ redirect = false } = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // refresh posts
      if (redirect) navigate("/feed");
    },
  });

  const submitPost = (content, image) => {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    mutate(formData);
  };

  return { submitPost, isPending, isError, error };
}
