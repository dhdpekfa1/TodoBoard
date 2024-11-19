"use client";

import { useRouter } from "next/navigation";
import { Button, SearchBar } from "@/components/ui";

export default function InitPage() {
  const router = useRouter();

  const onAddClick = () => {
    router.push("/board/1");
  };

  return (
    <div className="page">
      {/* TODO: aside 컴포넌트 분리 */}
      <aside className="page__aside">
        <SearchBar placeholder="검색어를 입력하세요." />
        <Button
          className="text-[#e79057] bg-white border border-[#e79057] hover:bg-[#fff9f5]"
          onClick={onAddClick}
        >
          Add New Page
        </Button>
        <div className="flex flex-col mt-4 gap-2">
          <small className="text-sm font-medium leading-none text-[#a6a6a6]">
            {`Ollin's`}
          </small>
          <ul className="flex flex-col">
            <li className="flex items-center gap-2 py-2 px-[10px] bg-[#f5f5f5] rounded-sm text-sm">
              <div className="bg-[#00f38d] w-2 h-2 rounded-full" />
              Enter Title
            </li>
            <li className="flex items-center gap-2 py-2 px-[10px] bg-[#f5f5f5] rounded-sm text-sm">
              <div className="bg-[#00f38d]  w-2 h-2 rounded-full" />
              Enter Title
            </li>
          </ul>
        </div>
      </aside>

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
          <Button
            className="text-[#e79057] bg-white border border-[#e79057] hover:bg-[#fff9f5] w-[156px]"
            onClick={onAddClick}
          >
            Add New Page
          </Button>
        </div>
      </main>
    </div>
  );
}
