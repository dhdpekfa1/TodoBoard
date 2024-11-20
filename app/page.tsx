"use client";

import { useRouter } from "next/navigation";
import { AddNewButtonOutline } from "@/components/ui";
import { addPageApi } from "./api/page";
import { useToast } from "@/hooks/use-toast";
import PageList from "@/features/page-list/PageList";

export default function InitPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Supabase Pages table에 새로운 TodoList 추가 TODO: 분리
  const createPage = async () => {
    const res = await addPageApi();
    if (res) {
      const id = res[0].id;

      toast({
        title: "새로운 Todo-List가 생성되었습니다.",
        description: "나만의 Todo를 완성하세요!",
      });
      router.push(`/board/${id}`);
    } else {
      toast({
        variant: "destructive",
        title: "다시 시도해주세요.",
        description: "Todo-List가 생성에 실패했습니다..",
      });
      return;
    }
  };

  return (
    <div className="page">
      <PageList />

      <main className="page__main">
        <div className="flex flex-col items-center justify-center gap-5 mb-5 w-full h-full">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            How to start:
          </h3>
          <div className="flex flex-col gap-3">
            <small className="text-sm font-normal leading-none">
              1. Create a page
            </small>
            <small className="text-sm font-normal leading-none">
              2. Add boards to page
            </small>
          </div>
          <AddNewButtonOutline onClick={createPage}>
            Add New Page
          </AddNewButtonOutline>
        </div>
      </main>
    </div>
  );
}
