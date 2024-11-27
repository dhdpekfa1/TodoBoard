"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  ResetPasswordDialog,
} from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { signInWithKakao } from "./api/auth";
import useEmailCheck from "@/hooks/use-email-check";

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const { checkEmail } = useEmailCheck();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useAtom(userAtom);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const signinWithEmail = async () => {
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 로그인 실패 처리
      if (error) {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        return;
      }

      // 로그인 성공 처리
      if (data?.user) {
        const { id, email, phone } = data.user;

        toast({
          title: "로그인 성공",
          description: "일정관리를 시작하세요!",
        });

        // cookie에 저장
        const userData = {
          id: data.user?.id || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          imgUrl: "/assets/images/profile.jpg",
        };
        document.cookie = `user=${JSON.stringify(
          userData
        )}; path=/; max-age=3600`; // 1시간 동안 유효

        // 전역 상태 업데이트
        setUser(userData);
        router.replace("/board");
      } else {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: "사용자 정보를 가져올 수 없습니다.",
        });
      }
    } catch (err) {
      console.error("Error in useSignin:", err);
      toast({
        variant: "destructive",
        title: "서버 오류",
        description:
          err instanceof Error
            ? err.message
            : "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  const signinWithKakao = async () => {
    try {
      const res = await signInWithKakao();
      if (res?.data) {
        toast({
          title: "카카오 로그인 성공",
          description: "환영합니다!",
        });

        setUser({
          id: res.data.id,
          email: res.data.email,
          phone: res.data.phone || "",
          imgUrl: res.data.profileImage || "assets/images/logo.png",
        });

        router.replace("/board");
      } else {
        throw new Error("카카오 로그인 실패");
      }
    } catch (err) {
      console.error("Error in signinWithKakao:", err);
      toast({
        variant: "destructive",
        title: "카카오 로그인 실패",
        description:
          err instanceof Error
            ? err.message
            : "카카오 인증 중 문제가 발생했습니다.",
      });
    }
  };
  const handleGoogleSignin = async () => {
    toast({
      variant: "default",
      title: "Google 로그인 준비 중",
      description: "구글 로그인 기능은 현재 준비 중입니다.",
    });
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
              서비스를 이용하려면 로그인을 진행해주세요.
            </p>
          </div>
        </div>
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              로그인을 위한 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
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
            <div className="relative grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <ResetPasswordDialog>
                  <p className="ml-auto inline-block text-sm underline cursor-pointer">
                    비밀번호를 잊으셨나요?
                  </p>
                </ResetPasswordDialog>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                size={"icon"}
                className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <CardFooter className="flex flex-col mt-6 gap-2">
            <Button
              className="w-full text-white bg-[#517157] hover:bg-[#415c47] hover:ring-1 hover:ring-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
              onClick={signinWithEmail}
            >
              로그인
            </Button>
            <div className="w-full flex justify-center gap-2">
              <Button
                className="w-full text-[#517157] border border-[#e4eae5] bg-white hover:text-white hover:bg-[#fae100] hover:ring-1 hover:ring-[#fae100] hover:ring-offset-1 hover:shadow-lg"
                onClick={signinWithKakao}
              >
                카카오 로그인
              </Button>
              <Button
                className="w-full text-[#517157] border border-[#e4eae5] bg-white hover:text-white hover:bg-[#e57368] hover:ring-1 hover:ring-[#e57368] hover:ring-offset-1 hover:shadow-lg"
                onClick={handleGoogleSignin}
              >
                구글 로그인
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?
              <Link href={"/signup"} className="underline text-sm ml-1">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
