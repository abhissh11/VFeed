import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../api/post";
import { useAuth } from "../context/AuthContext";

export function useToggleLike(postId) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => toggleLike(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update likes
      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: p.likes.includes(user?.id)
                  ? p.likes.filter((id) => id !== user.id)
                  : [...p.likes, user.id],
              }
            : p
        )
      );

      return { previousPosts };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}
