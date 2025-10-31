import { useMutation } from "@tanstack/react-query";
import { createPostWithImages } from "@/api/post";
import type { UseMutationCallback } from "@/types/types";

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
