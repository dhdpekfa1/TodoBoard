import { supabase } from "@/lib/supabase/client";
import { BoardContentType } from "../types/board";

// 조회
export const getContentApi = async (boardId: number) => {
  try {
    const { data, error } = await supabase
      .from("board_content")
      .select("id, title, content, is_checked")
      .eq("board_id", boardId);

    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    console.error("Error in getContentApi:", err);
  }
};

// 생성
export const addContentApi = async (
  boardId: number,
  title: string = "",
  content: string = "",
  isChecked: boolean = false
): Promise<BoardContentType | null> => {
  try {
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
      throw error;
    }

    if (data && data.length > 0) {
      return {
        contentId: data[0].id,
        isChecked: data[0].is_checked || false,
        title: data[0].title || "",
        content: data[0].content || null,
      };
    }

    return null;
  } catch (err) {
    console.error("Error in addContentApi:", err);
    return null;
  }
};

// 수정(등록)
export const updateContentApi = async (
  updateContent: BoardContentType
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("board_content")
      .update({
        title: updateContent.title,
        content: updateContent.content, // JSON 형식으로 콘텐츠 업데이트
        is_checked: updateContent.isChecked,
      })
      .eq("id", updateContent.contentId); // contentId로 특정 콘텐츠를 업데이트

    if (error) {
      console.error("Error updating content:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error in updateContentApi:", err);
    return false;
  }
};

// 삭제
export const deleteContentApi = async (contentId: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("boards_content")
      .delete()
      .eq("id", contentId);

    if (error) {
      throw error;
    }

    return true;
  } catch (err) {
    console.error("Error in deleteContentApi:", err);
    return false;
  }
};
