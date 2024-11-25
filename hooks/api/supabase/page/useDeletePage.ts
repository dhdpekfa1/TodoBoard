"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const useDeletePage = () => {
  const router = useRouter();

  const deletePage = async (pageId: number) => {
    try {
      console.log("Page ID to delete:", pageId);

      if (!pageId || typeof pageId !== "number") {
        console.error("Invalid Page ID:", pageId);
        toast({
          variant: "destructive",
          title: "잘못된 요청",
          description: "올바르지 않은 페이지 ID입니다.",
        });
        return false;
      }

      // 삭제 API 호출
      const { error } = await supabase.from("pages").delete().eq("id", pageId);

      if (error) {
        toast({
          variant: "destructive",
          title: "페이지 삭제 실패",
          description: `Supabase 오류 발생: ${
            error.message || "알 수 없는 오류"
          }`,
        });
        return false;
      }

      toast({
        title: "페이지 삭제 완료",
        description: "페이지를 성공적으로 삭제했습니다.",
      });

      console.log("Redirecting to '/'");
      await router.push("/");
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
      console.error("Error in useDeletePage:", err);
      return false;
    }
  };

  return deletePage;
};

export { useDeletePage };
