import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";

export default function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
