"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ButtonOutline, SearchBar } from "@/components/ui";
import { useAddPage, useGetPage, useGetPageList } from "@/hooks/api";
import NavUser from "./NavUser";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";

// const userData = {
//   name: "Ollin",
//   email: "ollin@example.com",
//   imgUrl: "/avatars/shadcn.jpg",
//   phone: "",
// };

const PageList = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [user] = useAtom(userAtom);
  const createPage = useAddPage();
  const { pages, getPageListApi } = useGetPageList();
  const { fetchPage } = useGetPage();

  useEffect(() => {
    getPageListApi();
  }, [pages]);

  const handlePageClick = async (id: number) => {
    const res = await fetchPage(id);

    if (!res) {
      console.error("handlePageClick 실패", res);
      toast({
        variant: "destructive",
        title: "페이지를 불러올 수 없습니다.",
        description: "다시 시도해주세요.",
      });
      return;
    }

    router.push(`/board/${id}`);
  };

  // 검색어 필터 함수
  const filteredPageData = pages
    ?.filter((data) => {
      // 타이틀이 없거나, 검색어가 포함된 경우 필터링
      return (
        !searchValue ||
        data?.title?.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    ?.sort((a, b) => {
      // 타이틀이 없는 경우 우선순위 조정 (빈 제목 아래로 이동)
      if (!a.title) return 1;
      if (!b.title) return -1;
      return a.title.localeCompare(b.title);
    });

  return (
    <aside className="page__aside">
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={searchValue || ""}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ButtonOutline onClick={createPage}>Add New Page</ButtonOutline>
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#a6a6a6]">
          {`Ollin's`}
        </small>
        <ul className="flex flex-col gap-1">
          {filteredPageData && filteredPageData.length > 0 ? (
            filteredPageData.map((data) => (
              <li
                key={data.id}
                onClick={() => handlePageClick(data.id)}
                className="flex items-center gap-2 py-2 px-[10px] bg-[#f5f5f5] text-sm cursor-pointer"
              >
                <div className="bg-[#00f38d] w-2 h-2 rounded-full" />
                {data.title && data.title.length > 12
                  ? `${data.title.slice(0, 13)}...`
                  : data.title}
                {!data.title && "등록된 제목이 없습니다."}
              </li>
            ))
          ) : (
            <li className="py-2 px-[10px] text-sm text-[#a6a6a6]">
              등록된 페이지가 없습니다.
            </li>
          )}
        </ul>
      </div>

      <NavUser user={user} />
    </aside>
  );
};

export default PageList;
