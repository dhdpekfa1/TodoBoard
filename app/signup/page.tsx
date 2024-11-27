"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import useEmailCheck from "@/hooks/use-email-check";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

const SignupPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const { checkEmail } = useEmailCheck();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const signupWithEmail = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 데이터(값)이 있습니다.",
        description:
          "이메일과 비밀번호는 필수 값입니다. 입력 후 다시 시도해주세요.",
      });
      return;
    }

    if (!checkEmail(email)) {
      toast({
        variant: "destructive",
        title: "이메일을 다시 확인해주세요.",
        description: "올바른 이메일 양식을 작성해주세요.",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "비밀번호는 최소 8자 이상 입력해야 합니다.",
        description: "소중한 정보를 지키기 위해 보안에 신경써봅시다!",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "회원가입 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        return;
      }

      if (data) {
        toast({
          title: "회원가입 성공",
          description: "로그인 후 일정관리를 시작하세요!",
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Error in signupWithEmail:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="page">
      <div className="page__container">
        <div className="flex flex-col items-center mt-10">
          <h4 className="text-lg font-semibold">안녕하세요👋</h4>
          <div className="flex flex-col items-center justify-center mt-2 mb-4">
            <div className="text-sm text-muted-foreground">
              <small className="text-sm text-[#517157] font-medium leading-none">
                일정 관리 앱
              </small>
              에 방문해주셔서 감사합니다.
            </div>
            <p className="text-sm text-muted-foreground">
              서비스를 이용하려면 회원가입을 진행해주세요.
            </p>
          </div>
        </div>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl">회원가입</CardTitle>
            <CardDescription>
              계정을 생성하기 위해 아래 내용을 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    간편 회원가입을 원하시면 이전 버튼을 클릭하세요.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={() => router.push("/")}
                >
                  이전
                </Button>
                <Button
                  className="w-full text-white bg-[#517157] hover:bg-[#415c47] hover:ring-1 hover:ring-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
                  onClick={signupWithEmail}
                >
                  회원가입
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href="/" className="underline">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
