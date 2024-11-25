"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { boardsAtom } from "@/stores/atoms";
import { useToast } from "@/hooks/use-toast";

const useDeleteBoard = () => {
  const [, setBoards] = useAtom(boardsAtom);
  const { toast } = useToast();

  const deleteBoard = async (boardId: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("boards")
        .delete()
        .eq("id", boardId);

      if (error) {
        toast({
          variant: "destructive",
          title: "보드 삭제 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        console.error("Error deleting board:", error);
        return false;
      }

      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.boardId !== boardId)
      );

      toast({
        title: "보드 삭제 성공",
        description: "보드가 성공적으로 삭제되었습니다.",
      });

      return true;
    } catch (err) {
      console.error("Unexpected error in useDeleteBoard:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return false;
    }
  };

  return deleteBoard;
};

export { useDeleteBoard };
