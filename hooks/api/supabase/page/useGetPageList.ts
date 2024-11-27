"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { pagesAtom } from "@/stores/atoms";
import { userAtom } from "@/stores/user";
import { toast } from "@/hooks/use-toast";

const useGetPageList = () => {
  const supabase = createClient();
  const [user] = useAtom(userAtom);
  const [pages, setPages] = useAtom(pagesAtom);

  const getPageListApi = async () => {
    try {
      if (!user?.id) {
        toast({
          variant: "destructive",
          title: "로그인 상태를 확인하세요.",
          description: "로그인 후 페이지를 불러올 수 있습니다.",
        });
        return;
      }

      const { data, status, error } = await supabase
        .from("pages")
        .select("*")
        .eq("user_uid", user.id);

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
