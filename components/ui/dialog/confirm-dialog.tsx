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
import { DeleteButton } from "../button/delete-button";
import { Button } from "../button/button";
import { ButtonProps } from "@/app/types/common";

const ConfirmDialog = ({ onClick }: ButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-rose-500 border border-rose-500 hover:text-white hover:bg-red-500"
        >
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            해당 데이터를 되돌릴 수 없고 완전히 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* 아웃라인 */}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          {/* 삭제버튼 */}
          <DeleteButton onClick={onClick} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmDialog };
