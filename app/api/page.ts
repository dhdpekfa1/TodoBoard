import { supabase } from "@/lib/supabase";
import { BoardDataType } from "../types/board";

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

// 저장 버튼 클릭 -> page 업데이트
export const updatePageApi = async (
  id: number,
  title: string,
  startDate: Date | null,
  endDate: Date | null
) => {
  try {
    const { data, error } = await supabase
      .from("pages")
      .update({
        title: title,
        start_date:
          startDate instanceof Date ? startDate.toISOString() : startDate,
        end_date: endDate instanceof Date ? endDate.toISOString() : endDate,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error in updatePageApi:", err);
    return null;
  }
};
