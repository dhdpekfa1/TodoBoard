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
} from "@/components/ui";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  // const handleLogin = () => {};

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
              />
            </div>
            <div className="relative grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <Link
                  href={"#"}
                  className="ml-auto inline-block text-sm underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <Input
                id="password"
                type={"password"}
                placeholder="비밀번호를 입력하세요."
              />
              <Button
                size="icon"
                className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
              >
                <Eye className="h-5 w-5 text-muted-foreground" />
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
          <CardFooter className="flex flex-col mt-6">
            <Button className="w-full text-white bg-[#517157] hover:bg-[#415c47] hover:ring-1 hover:ring-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg">
              로그인
            </Button>
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
