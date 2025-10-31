import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";

export default function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
