"use client";

import { useAtom } from "jotai";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { contentAtom } from "@/stores/atoms";
import { BoardContentType } from "@/app/types/board";

const useAddContent = () => {
  const { toast } = useToast();
  const [contentData, setContentData] = useAtom(contentAtom);

  const addContent = async (
    boardId: number,
    contentId?: number,
    title: string = "",
    content: string = "",
    isChecked: boolean = false
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
            title,
            content,
            is_checked: isChecked,
          },
        ])
        .select("id, title, content, is_checked");

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
          isChecked: data[0].is_checked || false,
          title: data[0].title || "",
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
