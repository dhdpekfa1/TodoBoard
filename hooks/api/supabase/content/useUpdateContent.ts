"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useGetContent } from "./useGetContent";
import { BoardContentType } from "@/app/types/board";

// TODO: 콘텐츠 생성 후 바로 해당 콘텐츠 못 찾고 새로고침 후에만 확인됨
// CardBoard로직까지 수정 필요
const useUpdateContent = () => {
  const supabase = createClient();
  const { fetchContent, contentData: fetchedContentData } = useGetContent();
  const [contentData, setContentData] = useState<BoardContentType[]>([]);

  const updateContent = async (
    updatedContent: BoardContentType
  ): Promise<BoardContentType | null> => {
    try {
      const { error } = await supabase
        .from("board_content")
        .update({
          content: updatedContent.content,
        })
        .eq("id", updatedContent.contentId);

      if (error) {
        toast({
          variant: "destructive",
          title: "콘텐츠 업데이트 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        console.error("Error updating content:", error);
        return null;
      }

      const updatedData = { ...updatedContent };
      setContentData((prevContent) =>
        prevContent.map((content) =>
          content.contentId === updatedContent.contentId ? updatedData : content
        )
      );

      toast({
        title: "콘텐츠 업데이트 성공",
        description: "콘텐츠가 성공적으로 업데이트되었습니다.",
      });

      return updatedData;
    } catch (err) {
      console.error("Unexpected error in useUpdateContent:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return null;
    }
  };

  return { contentData, updateContent, setContentData };
};

export { useUpdateContent };
