import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSignUp from "@/hooks/mutations/auth/use-sign-up";
import { generateErrorMessage } from "@/lib/error";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">회원가입</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSignInSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-6"
            type="email"
            placeholder="example@abc.com"
            disabled={isSignUpPending}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-6"
            type="password"
            placeholder="password"
            disabled={isSignUpPending}
          />
        </div>
        <div>
          <Button className="w-full" type="submit" disabled={isSignUpPending}>
            회원가입
          </Button>
        </div>
      </form>
      <div>
        <Link className="text-muted-foreground hover:underline" to="/sign-in">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
