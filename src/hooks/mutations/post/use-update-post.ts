import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/api/post";
import type { UseMutationCallback } from "@/types/types";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
