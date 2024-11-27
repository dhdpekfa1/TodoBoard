"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
} from "@/components/ui";
import { Label } from "../label/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";

const ResetPasswordDialog = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/password-setting",
      });
      toast({
        title: "비밀번호 재설정 이메일을 전송했습니다.",
        description:
          "이메일 주소로 비밀번호 초기화 링크를 전송했습니다. 이메일을 확인하여 비밀번호를 변경하세요.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>비밀번호를 잊으셨나요?</AlertDialogTitle>
          <AlertDialogDescription>
            비밀번호 초기화를 위해 계정 생성 시 작성한 <br />
            본인의 이메일 주소를 하단에 기입해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요."
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-[#517157] hover:bg-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
            onClick={handleResetPassword}
          >
            전송
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ResetPasswordDialog };
