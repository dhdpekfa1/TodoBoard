"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { boardsAtom } from "@/stores/atoms";
import { BoardDataType } from "@/app/types/board";
import { useToast } from "@/hooks/use-toast";

const useGetBoardList = () => {
  const [boards, setBoards] = useAtom(boardsAtom);
  const { toast } = useToast();

  const fetchBoards = async (pageId: number): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("boards")
        .select("id, page_id, title, start_date, end_date, content, is_checked")
        .eq("page_id", pageId);

      if (error) {
        toast({
          variant: "destructive",
          title: "보드 데이터를 불러오지 못했습니다.",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        throw error;
      }

      const formattedBoards: BoardDataType[] =
        data?.map((item) => ({
          boardId: item.id,
          isChecked: item.is_checked || false,
          title: item.title || "",
          startDate: item.start_date || null,
          endDate: item.end_date || null,
          content: item.content || null,
        })) || [];

      setBoards(formattedBoards); // 상태 업데이트
    } catch (err) {
      console.error("Error in useBoardList.fetchBoards:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  return { boards, fetchBoards };
};

export { useGetBoardList };
