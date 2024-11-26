import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./dialog";
import { Button } from "../button/button";

const ResetPasswordDialog = () => {
  const handlePasswordReset = () => {
    // TODO: 이메일 전송 로직
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <small className="ml-auto inline-block text-sm underline cursor-pointer">
          비밀번호를 잊으셨나요?
        </small>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>비밀번호를 재설정하시겠습니까?</DialogTitle>
          <DialogDescription>
            비밀번호 초기화를 위해 회원가입에 사용한 이메일 주소를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        {/* <DialogContent>input 영역</DialogContent> */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handlePasswordReset}
              className="text-white bg-[#517157] hover:bg-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
            >
              전송
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ResetPasswordDialog };
