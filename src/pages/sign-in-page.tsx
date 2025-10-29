import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSignInWithPassword from "@/hooks/mutations/use-sign-in-with-password";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signInWithPassword } = useSignInWithPassword();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
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
      <div>
        <Button className="w-full" onClick={handleSignInWithPasswordClick}>
          로그인
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
