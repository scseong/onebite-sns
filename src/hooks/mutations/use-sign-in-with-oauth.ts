import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";

export default function useSignInOAuth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
