import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth";

export default function useSignInWithPassword() {
  return useMutation({ mutationFn: signInWithPassword });
}
