"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { boardsAtom } from "@/stores/atoms";
import { BoardDataType } from "@/app/types/board";

const useAddBoard = () => {
  const { toast } = useToast();
  const [, setBoards] = useAtom(boardsAtom);

  const addBoardApi = async (
    pageId: number,
    title: string = "",
    startDate: Date | null = null,
    endDate: Date | null = null,
    content: object | null = null
  ): Promise<BoardDataType | null> => {
    try {
      const { data, error } = await supabase
        .from("boards")
        .insert([
          {
            page_id: pageId,
            title,
            start_date: startDate,
            end_date: endDate,
            content,
          },
        ])
        .select("id, is_checked, title, start_date, end_date, content");

      if (error) {
        toast({
          variant: "destructive",
          title: "보드 생성 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        return null;
      }

      if (data && data.length > 0) {
        const newBoard: BoardDataType = {
          boardId: data[0].id,
          isChecked: data[0].is_checked || false,
          title: data[0].title || "",
          startDate: data[0].start_date || null,
          endDate: data[0].end_date || null,
          content: data[0].content || null,
        };

        // boardsAtom에 새 보드 추가
        setBoards((prevBoards) => [...prevBoards, newBoard]);

        toast({
          title: "보드 생성 성공",
          description: "새 보드가 성공적으로 추가되었습니다.",
        });

        return newBoard;
      }

      return null;
    } catch (err) {
      console.error("Error in useAddBoard:", err);

      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });

      return null;
    }
  };

  return addBoardApi;
};

export { useAddBoard };
