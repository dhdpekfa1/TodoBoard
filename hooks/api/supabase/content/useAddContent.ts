"use client";

import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { BoardContentType } from "@/app/types/board";
import { useState } from "react";

const useAddContent = () => {
  const [contentData, setContentData] = useState<BoardContentType[]>([]);

  const addContent = async (
    boardId: number,
    contentId?: number,
    content: string = ""
  ): Promise<BoardContentType | null> => {
    try {
      // 이미 contentId가 존재 -> 생성하지 않음
      if (contentId) {
        return null;
      }

      const { data, error } = await supabase
        .from("board_content")
        .insert([
          {
            board_id: boardId,
            content,
          },
        ])
        .select("id, content");

      if (error) {
        toast({
          variant: "destructive",
          title: "콘텐츠 추가 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        throw error;
      }

      if (data && data.length > 0) {
        const newContent: BoardContentType = {
          contentId: data[0].id,
          content: data[0].content || "",
        };

        setContentData((prev) => [...prev, newContent]);

        toast({
          title: "콘텐츠 추가 성공",
          description: "새 콘텐츠가 성공적으로 추가되었습니다.",
        });

        return newContent;
      }

      return null;
    } catch (err) {
      console.error("Error in useAddContent:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return null;
    }
  };

  return addContent;
};

export { useAddContent };
