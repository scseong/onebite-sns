import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";

export default function useUpdatePassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
