"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BoardContentType } from "@/app/types/board";

const useGetContent = () => {
  const supabase = createClient();
  const [contentData, setContentData] = useState<BoardContentType[]>([]);

  const fetchContent = async (
    boardId: number
  ): Promise<BoardContentType[] | null> => {
    try {
      const { data, error } = await supabase
        .from("board_content")
        .select("id, content")
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
          content: item.content || "",
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
