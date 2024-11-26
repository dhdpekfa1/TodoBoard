"use client";

import { useAtom } from "jotai";
import { pageAtom } from "@/stores/atoms";
import { userAtom } from "@/stores/user";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const useGetPage = () => {
  const [user] = useAtom(userAtom);
  const [page, setPage] = useAtom(pageAtom);

  const fetchPage = async (pageId: number) => {
    try {
      const userUid = user?.id;

      if (!userUid) {
        toast({
          variant: "destructive",
          title: "유저 인증 실패",
          description: "로그인 상태를 확인해주세요.",
        });
        return null;
      }

      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", pageId)
        .eq("user_uid", userUid);

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
