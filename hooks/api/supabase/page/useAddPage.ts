"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { pagesAtom } from "@/stores/atoms";
import { userAtom } from "@/stores/user";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";

const useAddPage = () => {
  const supabase = createClient();
  const [user] = useAtom(userAtom);
  const [, setPages] = useAtom(pagesAtom);
  const router = useRouter();

  const addPageApi = async () => {
    try {
      if (!user?.id) {
        toast({
          variant: "destructive",
          title: "로그인 상태 확인 필요",
          description: "로그인 후 페이지를 생성할 수 있습니다.",
        });
        return;
      }

      const { data, status, error } = await supabase
        .from("pages")
        .insert([
          {
            title: null,
            start_date: null,
            end_date: null,
            user_uid: user.id,
          },
        ])
        .select();

      if (data && status === 201) {
        setPages((prevPages) => [...prevPages, data[0]]);

        router.push(`/board/${data[0].id}`);
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "페이지를 불러오지 못했습니다.",
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
      console.error("Error in useAddPage:", err);
    }
  };

  return addPageApi;
};

export { useAddPage };
