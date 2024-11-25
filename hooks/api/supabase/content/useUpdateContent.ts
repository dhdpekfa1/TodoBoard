"use client";

import { useAtom } from "jotai";
import { contentAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { BoardContentType } from "@/app/types/board";

const useUpdateContent = () => {
  const [, setContentData] = useAtom(contentAtom);

  const updateContent = async (
    updateContent: BoardContentType
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("board_content")
        .update({
          title: updateContent.title,
          content: updateContent.content,
          is_checked: updateContent.isChecked,
        })
        .eq("id", updateContent.contentId);

      if (error) {
        toast({
          variant: "destructive",
          title: "콘텐츠 업데이트 실패",
          description: error.message || "알 수 없는 오류가 발생했습니다.",
        });
        console.error("Error updating content:", error);
        return false;
      }

      setContentData((prevContent) =>
        prevContent
          ? prevContent.map((content) =>
              content.contentId === updateContent.contentId
                ? { ...content, ...updateContent }
                : content
            )
          : []
      );

      toast({
        title: "콘텐츠 업데이트 성공",
        description: "콘텐츠가 성공적으로 업데이트되었습니다.",
      });

      return true;
    } catch (err) {
      console.error("Unexpected error in useUpdateContent:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return false;
    }
  };

  return updateContent;
};

export { useUpdateContent };
