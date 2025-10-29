import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSignInWithPassword from "@/hooks/mutations/use-sign-in-with-password";
import useSignInOAuth from "@/hooks/mutations/use-sign-in-with-oauth";
import gitHubLogo from "@/assets/github-mark.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signInWithPassword } = useSignInWithPassword();
  const { mutate: signInWithOAuth } = useSignInOAuth();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">로그인</h1>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={handleSignInWithPasswordClick}
        >
          로그인
        </Button>
        <Button
          className="w-full cursor-pointer"
          variant="outline"
          onClick={handleSignInWithGitHubClick}
        >
          <img className="h-4 w-4" src={gitHubLogo} alt="Github 로고" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to="/sign-up">
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
