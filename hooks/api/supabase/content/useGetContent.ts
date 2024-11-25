"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { contentAtom } from "@/stores/atoms";
import { toast } from "@/hooks/use-toast";
import { BoardContentType } from "@/app/types/board";

const useGetContent = () => {
  const [contentData, setContentData] = useAtom(contentAtom);

  const fetchContent = async (
    boardId: number
  ): Promise<BoardContentType[] | null> => {
    try {
      const { data, error } = await supabase
        .from("board_content")
        .select("id, title, content, is_checked")
        .eq("board_id", boardId);

      if (error) {
        toast({
          variant: "destructive",
          title: "콘텐츠 불러오기 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        console.error("Error fetching content:", error);
        return null;
      }

      const formattedData: BoardContentType[] =
        data?.map((item) => ({
          contentId: item.id,
          title: item.title || "",
          content: item.content || "",
          isChecked: item.is_checked || false,
        })) || [];

      setContentData(formattedData);
      return formattedData;
    } catch (err) {
      console.error("Unexpected error in useGetContent:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return null;
    }
  };

  return { contentData, fetchContent };
};

export { useGetContent };
