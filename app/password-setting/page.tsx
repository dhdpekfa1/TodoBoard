"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  Button,
  CardFooter,
  ButtonFill,
} from "@/components/ui";

const PasswordSetting = () => {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const handelChangePassword = async () => {
    if (!password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 데이터(값)가 있습니다.",
        description: "변경할 비밀번호와 비밀번호 확인은 필수 값입니다.",
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
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "입력한 비밀번호가 일치하지 않습니다.",
        description:
          "새 비밀번호와 비밀번호 확인란에 입력한 값이 일치한지 확인하세요.",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        return;
      }

      if (data && !error) {
        toast({
          title: "비밀번호 변경 성공",
          description: "변경된 비밀번호로 로그인 후 일정관리를 시작하세요!",
        });
        router.replace("/");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "비밀번호 재설정에 실패했습니다.",
        description: err,
      });
    }
  };

  return (
    <div className="page">
      <div className="page__container">
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">비밀번호 변경</CardTitle>
            <CardDescription>
              비밀번호 변경을 위해 변경할 비밀번호를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="relative grid gap-2">
              <Label htmlFor="password">변경할 비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="변경할 비밀번호를 입력하세요."
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="password">비밀번호 확인</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 한 번 더 입력하세요."
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <Button
                size={"icon"}
                className="absolute top-8 right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
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
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                🍀 비밀번호를 알고계신다면 돌아가기 버튼을 누르세요.
              </span>
            </div>
          </div>
          <CardFooter className="w-full flex flex-col mt-6">
            <div className="w-full flex items-center gap-4">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => router.replace("/")}
              >
                돌아가기
              </Button>
              <ButtonFill onClick={handelChangePassword}>
                비밀번호 변경
              </ButtonFill>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PasswordSetting;
