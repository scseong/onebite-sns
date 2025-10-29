import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth";

export default function useSignInOAuth() {
  return useMutation({ mutationFn: signInWithOAuth });
}
