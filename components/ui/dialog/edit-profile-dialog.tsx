"use client";

import { ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
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
  Label,
} from "@/components/ui";

const EditProfileDialog = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useAtom(userAtom);
  const supabase = createClient();
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [nickname, setNickname] = useState<string>(user?.nickname || "");

  // TODO: table 업데이트 안됨 확인
  const updateUserInfo = async () => {
    try {
      const user = await supabase.auth.getUser(); // 로그인된 사용자의 정보

      console.log("user ", user);

      if (user.data) {
        const { data, error } = await supabase.auth.updateUser({
          data: { nickname, phone_number: phoneNumber },
        });

        if (error) {
          console.log("user Data", user.data);
          toast({
            variant: "destructive",
            title: "에러가 발생했습니다.",
            description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
          });
        } else if (data && !error) {
          toast({
            title: "프로필 수정을 완료하였습니다.",
          });
          const updatedUserData = {
            id: data.user?.id || "",
            email: data.user?.email || "",
            phoneNumber: data.user?.user_metadata.phone_number || "",
            nickname: data.user?.user_metadata.nickname || "",
            imgUrl: "/assets/images/profile.jpg",
          };
          setUser(updatedUserData);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formattedNumber = input;

    if (input.length <= 3) {
      formattedNumber = input;
    } else if (input.length <= 7) {
      formattedNumber = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else {
      formattedNumber = `${input.slice(0, 3)}-${input.slice(
        3,
        7
      )}-${input.slice(7, 11)}`;
    }

    setPhoneNumber(formattedNumber);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 설정</AlertDialogTitle>
          <AlertDialogDescription>
            변경할 프로필 정보를 입력해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" disabled value={user?.email} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">닉네임</Label>
            <Input
              id="name"
              type="name"
              placeholder="사용할 닉네임을 입력해주세요."
              required
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">휴대폰 번호</Label>
            <Input
              id="phone"
              type="text"
              placeholder="핸드폰 번호를 입력해주세요."
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-[#517157] hover:bg-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
            onClick={updateUserInfo}
          >
            저장
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { EditProfileDialog };
