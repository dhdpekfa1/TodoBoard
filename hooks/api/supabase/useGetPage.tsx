"use client";

import { useAtom } from "jotai";
import { pageAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const useGetPage = () => {
  const [page, setPage] = useAtom(pageAtom);
  const { toast } = useToast();

  const fetchPage = async (pageId: number) => {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", pageId);

      if (error) {
        toast({
          variant: "destructive",
          title: "페이지 조회 실패",
          description: "페이지 정보를 불러오지 못했습니다.",
        });
        return null;
      }

      const pageData = data?.[0] || null;
      setPage(pageData);
      return pageData;
    } catch (err) {
      console.error("Error in useGetPage:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      return null;
    }
  };

  return { page, fetchPage };
};

export { useGetPage };
