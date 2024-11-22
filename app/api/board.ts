import { supabase } from "@/lib/supabase/client";
import { BoardDataType } from "../types/board";

// 보드 전체 조회
export const getBoardApi = async (pageId: number): Promise<BoardDataType[]> => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .select("id, page_id, title, start_date, end_date, content, is_checked")
      .eq("page_id", pageId);

    if (error) {
      throw error;
    }

    return (
      data?.map((item) => ({
        boardId: item.id,
        isChecked: item.is_checked || false,
        title: item.title || "",
        startDate: item.start_date || null,
        endDate: item.end_date || null,
        content: item.content || null,
      })) || []
    );
  } catch (err) {
    console.error("Error in getBoardApi:", err);
    return [];
  }
};

// 보드 추가 API
export const addBoardApi = async (
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
          title: title,
          start_date: startDate,
          end_date: endDate,
          content: content,
        },
      ])
      .select("id, is_checked, title, start_date, end_date, content");

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return {
        boardId: data[0].id,
        isChecked: data[0].is_checked || false,
        title: data[0].title || "",
        startDate: data[0].start_date || null,
        endDate: data[0].end_date || null,
        content: data[0].content || null,
      };
    }

    return null;
  } catch (err) {
    console.error("Error in addBoardApi:", err);
    return null;
  }
};

// 보드 업데이트
export const updateBoardsApi = async (
  updatedBoard: BoardDataType
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .update({
        title: updatedBoard.title,
        start_date:
          updatedBoard.startDate instanceof Date
            ? updatedBoard.startDate.toISOString() // Date를 ISO 문자열로 변환
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
      console.error("Error updating board:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error in updateBoardsApi:", err);
    return false;
  }
};

// 보드 삭제
export const deleteBoardApi = async (boardId: number): Promise<boolean> => {
  try {
    const { error } = await supabase.from("boards").delete().eq("id", boardId);

    if (error) {
      throw error;
    }

    return true;
  } catch (err) {
    console.error("Error in deleteBoardApi:", err);
    return false;
  }
};
