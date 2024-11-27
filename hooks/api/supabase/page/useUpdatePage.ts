"use client";

import { useAtom } from "jotai";
import { pageAtom } from "@/stores/atoms";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { PageDataType } from "@/app/types/board";

const useUpdatePage = () => {
  const supabase = createClient();
  const [, setPage] = useAtom(pageAtom);

  const updatePageApi = async (updatedPage: PageDataType): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("pages")
        .update({
          title: updatedPage.title,
          start_date:
            updatedPage.startDate instanceof Date
              ? updatedPage.startDate.toISOString()
              : updatedPage.startDate,
          end_date:
            updatedPage.endDate instanceof Date
              ? updatedPage.endDate.toISOString()
              : updatedPage.endDate,
        })
        .eq("id", updatedPage.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "페이지 수정에 실패했습니다.",
          description: `Supabase 오류 발생: ${
            error.message || "알 수 없는 오류"
          }`,
        });
        return false;
      }

      setPage((prevPage) =>
        prevPage && prevPage.id === updatedPage.id
          ? { ...prevPage, ...updatedPage }
          : prevPage
      );

      toast({
        title: "페이지 업데이트 성공",
        description: "페이지가 성공적으로 업데이트되었습니다.",
      });

      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      console.error("Error in updatePageApi:", err);
      return false;
    }
  };

  return updatePageApi;
};

export { useUpdatePage };
