"use client";

import { useAtom } from "jotai";
import { pagesAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const useGetPageList = () => {
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();

  const getPageListApi = async () => {
    try {
      const { data, status, error } = await supabase.from("pages").select("*");

      if (data && status === 200) {
        setPages(data);
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "해당 페이지를 불러오지 못했습니다.",
          description: `Supabase 오류 발생: ${
            error.message || "알 수 없는 오류"
          }`,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      console.error("Error in useGetPages:", err);
    }
  };

  return { pages, getPageListApi };
};

export { useGetPageList };
