"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { boardsAtom } from "@/stores/atoms";
import { toast } from "@/hooks/use-toast";
import { BoardDataType } from "@/app/types/board";

const useUpdateBoard = () => {
  const [, setBoards] = useAtom(boardsAtom);

  const updateBoardApi = async (
    updatedBoard: BoardDataType
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("boards")
        .update({
          title: updatedBoard.title,
          start_date:
            updatedBoard.startDate instanceof Date
              ? updatedBoard.startDate.toISOString()
              : updatedBoard.startDate,
          end_date:
            updatedBoard.endDate instanceof Date
              ? updatedBoard.endDate.toISOString()
              : updatedBoard.endDate,
          is_checked: updatedBoard.isChecked,
          content: updatedBoard.content,
        })
        .eq("id", updatedBoard.boardId);

      if (error) {
        toast({
          variant: "destructive",
          title: "보드 업데이트 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        console.error("Error updating board:", error);
        return false;
      }

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.boardId === updatedBoard.boardId ? updatedBoard : board
        )
      );

      toast({
        title: "보드 업데이트 성공",
        description: "보드가 성공적으로 업데이트되었습니다.",
      });

      return true;
    } catch (err) {
      console.error("Unexpected error in useUpdateBoard:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return false;
    }
  };

  return updateBoardApi;
};

export { useUpdateBoard };
