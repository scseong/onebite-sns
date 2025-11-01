import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRequestPasswordResetEmail from "@/hooks/mutations/auth/use-request-password-reset-email";
import { useToast } from "@/hooks/use-toast";
import { generateErrorMessage } from "@/lib/error";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const { showInfoToast, showErrorToast } = useToast();
  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      showInfoToast("인증 메일이 발송되었습니다.");
      setEmail("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      showErrorToast(message);
      setEmail("");
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") return;

    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">비밀번호를 잊으셨나요?</h1>
        <p className="text-muted-foreground">
          이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
        </p>
      </div>
      <Input
        className="py-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@abc.com"
        disabled={isRequestPasswordResetEmailPending}
      />
      <Button className="w-full" onClick={handleSendEmailClick}>
        인증 메일 요청하기
      </Button>
    </div>
  );
}
