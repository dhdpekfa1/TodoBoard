import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { toast } from "@/hooks/use-toast";
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

const DeleteUserDialog = () => {
  const supabase = createClient();
  const router = useRouter();
  const [user] = useAtom(userAtom);

  // TODO: 탈퇴 안되는 이슈 확인
  const handleDeleteUser = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(
        String(user.id)
      );
      if (error) {
        toast({
          variant: "destructive",
          title: "회원 탈퇴 실패",
          description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
        });
        return;
      }
      if (data) {
        console.log(data);
        toast({
          title: "회원 탈퇴 성공",
          description:
            "성공적으로 회원 탈퇴를 완료했습니다. Todo-Board를 다시 이용하시려면 회원 가입을 진행해주세요.",
        });
        router.replace("/");
      }
    } catch (err) {
      console.error("Unexpected error in useUpdateContent:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-rose-500 border border-rose-500 hover:text-white hover:bg-red-500"
        >
          회원 탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>정말 탈퇴하시겠습니까?</DialogTitle>
          <DialogDescription>
            탈퇴할 경우 작성했던 보드 내용과 유저 정보를 포함한 모든 정보가
            삭제됩니다.
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
          <DeleteButton onClick={handleDeleteUser} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
