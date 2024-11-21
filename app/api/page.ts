import { supabase } from "@/lib/supabase";
import { BoardDataType, PageDataType } from "../types/board";

// 페이지 전체 조회
export const getPageListApi = async () => {
  try {
    const { data, error } = await supabase.from("pages").select("*");

    if (error) {
      throw new Error();
    }

    return data;
  } catch (err) {
    console.error("Error in getPageListApi:", err);
  }
};

// 해당 페이지 조회
export const getPageApi = async (pageId: number) => {
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("id", pageId);
    if (error) {
      throw new Error();
    }

    return data?.[0] || null;
  } catch (err) {
    console.error("Error in getPageApi:", err);
    return null;
  }
};

// 페이지 생성
export const addPageApi = async () => {
  try {
    const { data, error } = await supabase
      .from("pages")
      .insert([
        {
          title: "",
          start_date: null,
          end_date: null,
        },
      ])
      .select("id, created_at"); // ID와 created_at 반환

    if (error) {
      throw error;
    }

    return data; // select -> ID와 created_at을 반환
  } catch (err) {
    console.error("Error in addPageApi:", err);
  }
};

// 저장 버튼 클릭 -> 페이지 수정(업데이트)
export const updatePageApi = async (updatedBoard: PageDataType) => {
  try {
    const { data, error } = await supabase
      .from("pages")
      .update({
        title: updatedBoard.title,
        start_date:
          updatedBoard.startDate instanceof Date
            ? updatedBoard.startDate.toISOString()
            : updatedBoard.startDate,
        end_date:
          updatedBoard.endDate instanceof Date
            ? updatedBoard.endDate.toISOString()
            : updatedBoard.endDate,
      })
      .eq("id", updatedBoard.id);

    if (error) {
      throw error;
    }

    return true;
  } catch (err) {
    console.error("Error in updatePageApi:", err);
    return false;
  }
};

// 페이지 삭제
export const deletePageApi = async (pageId: number): Promise<boolean> => {
  try {
    const { error } = await supabase.from("pages").delete().eq("id", pageId);

    if (error) {
      throw error;
    }

    return true; // 삭제 성공
  } catch (err) {
    console.error("Error in deletePageApi:", err);
    return false; // 삭제 실패
  }
};
