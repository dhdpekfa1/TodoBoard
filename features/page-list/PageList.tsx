import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addPageApi, getPageApi, getPageListApi } from "@/app/api/page";
import { PageDataType } from "@/app/types/board";
import { ButtonOutline, SearchBar } from "@/components/ui";

const PageList = () => {
  const router = useRouter();

  const [pageData, setPageData] = useState<PageDataType[]>();
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPageDataList();
  }, []);

  const fetchPageDataList = async () => {
    const res = await getPageListApi();
    setPageData(res);
  };

  const handlePageClick = async (id: number) => {
    const res = await getPageApi(id);

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

  // Supabase Pages table에 새로운 TodoList 추가 TODO : 분리
  const createPage = async () => {
    const res = await addPageApi();
    if (res) {
      const id = res[0].id;

      toast({
        title: "새로운 Todo-List가 생성되었습니다.",
        description: "나만의 Todo를 완성하세요!",
      });
      router.push(`/board/${id}`);

      fetchPageDataList();
    } else {
      toast({
        variant: "destructive",
        title: "다시 시도해주세요.",
        description: "Todo-List가 생성에 실패했습니다..",
      });
      return;
    }
  };

  // 검색어 필터 함수
  const filteredPageData = pageData?.filter((data) =>
    data.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <aside className="page__aside">
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ButtonOutline onClick={createPage}>Add New Page</ButtonOutline>
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#a6a6a6]">
          {`Ollin's`}
        </small>
        <ul className="flex flex-col">
          {filteredPageData && filteredPageData.length > 0 ? (
            filteredPageData.map((data) => (
              <li
                key={data.id}
                onClick={() => handlePageClick(data.id)}
                className="flex items-center gap-2 py-2 px-[10px] bg-[#f5f5f5] rounded-sm text-sm cursor-pointer"
              >
                <div className="bg-[#00f38d] w-2 h-2 rounded-full" />
                {data.title ? data.title : "제목 없음"}
              </li>
            ))
          ) : (
            <li className="py-2 px-[10px] text-sm text-[#a6a6a6]">
              No results found
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default PageList;
