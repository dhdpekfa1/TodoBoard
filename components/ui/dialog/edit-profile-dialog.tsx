"use client";

import { ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
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

  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone || "");
  const [nickname, setNickname] = useState<string>(user?.nickname || "");

  const handleSave = () => {
    // TODO: 프로필 변경 적용(저장)
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
            <Input id="email" type="email" required value={user?.email} />
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
              required
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-[#517157] hover:bg-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
            onClick={handleSave}
          >
            저장
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { EditProfileDialog };