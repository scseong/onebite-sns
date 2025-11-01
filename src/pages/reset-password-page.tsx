import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useUpdatePassword from "@/hooks/mutations/auth/use-update-password";
import { generateErrorMessage } from "@/lib/error";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showInfoToast, showErrorToast } = useToast();
  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        showInfoToast("비밀번호가 성공적으로 변경되었습니다");
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        showErrorToast(message);
        setPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">비밀번호 재설정하기</h1>
        <p className="text-muted-foreground">새로운 비밀번호를 입력하세요</p>
      </div>
      <Input
        className="py-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        disabled={isUpdatePasswordPending}
      />
      <Button
        className="w-full"
        onClick={handleUpdatePasswordClick}
        disabled={isUpdatePasswordPending}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
