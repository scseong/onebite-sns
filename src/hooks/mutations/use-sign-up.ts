import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";

export default function useSignUp() {
  return useMutation({ mutationFn: signUp });
}
