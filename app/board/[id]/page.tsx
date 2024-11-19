import React from "react";
import { Button, Input, Progress, SearchBar } from "@/components/ui";
import styles from "./page.module.scss";

const BoardPage = () => {
  return (
    <div className="page">
      <aside className="page__aside">
        <SearchBar placeholder="검색어를 입력하세요." />
        <Button className="text-[#e79057] bg-white border border-[#e79057] hover:bg-[#fff9f5]">
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
        <div className={styles.header}>
          <div className={styles.header__top}>
            {/* 제목 input */}
            <Input placeholder="Enter Title Here" />
            {/* 진행사항 그래프 */}
            <div className="flex items-center justify-start gap-4">
              <small className="text-sm font-medium leading-none text-[#6d6d6d]">
                1/10 Completed
              </small>
              <Progress className="w-60 h-3" />
            </div>
          </div>
          <div>
            {/*달력 */}
            {/* button */}
          </div>
        </div>
        <div className={styles.body}></div>
      </main>
    </div>
  );
};

export default BoardPage;
