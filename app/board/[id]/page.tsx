"use client";

import React from "react";
import {
  AddNewButtonFill,
  Button,
  LabelDatePicker,
  Progress,
  SearchBar,
} from "@/components/ui";

import { ChevronLeft } from "lucide-react";
import { CardBoard } from "@/features/board";
import styles from "./page.module.scss";

const BoardPage = () => {
  const createBoard = () => {};

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
          <div className={styles[`header__btn-box`]}>
            <Button variant={"outline"}>
              <ChevronLeft />
            </Button>
            <Button variant={"secondary"}>저장</Button>
          </div>
          <div className={styles.header__top}>
            {/* 제목 input */}
            <input
              type="text"
              placeholder="Enter Title Here"
              className={styles.header__top__input}
            />
            {/* 진행사항 그래프 */}
            <div className="flex items-center justify-start gap-4 mb-4">
              <small className="text-sm font-medium leading-none text-[#6d6d6d]">
                1/10 Completed
              </small>
              <Progress className="w-60 h-3" />
            </div>
          </div>
          <div className={styles.header__bottom}>
            <div className="flex items-center gap-5">
              <LabelDatePicker label={"From"} />
              <LabelDatePicker label={"To"} />
            </div>
            <AddNewButtonFill onClick={createBoard}>
              Add New Board
            </AddNewButtonFill>
          </div>
        </div>
        <div className={styles.body}>
          {/* 생성 전 */}
          {/* <div className={styles.body__noData}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-[#454545]">
              There is no board yet.
            </h3>
            <div className="flex flex-col gap-3">
              <small className="text-sm font-normal leading-none text-[#454545]">
                Click the button and start flashing!
              </small>
            </div>
            <Button
              className="flex items-center justify-center w-20 h-20 mt-5 cursor-pointer text-[#e79057] bg-[#f9f9f9] rounded-full border-spacing-1 hover:bg-[#e79057] hover:ring-1 hover:ring-[#e79057] hover:ring-offset-1 active:bg-[#e79057] hover:shadow-lg hover:text-white"
              onClick={createBoard}
            >
              <h1 className="scroll-m-20 text-4xl font-light tracking-tight lg:text-5xl">
                +
              </h1>
            </Button>
          </div> */}

          {/* 생성 부분 */}
          <div className={styles.body__isData}>
            <CardBoard />
            <CardBoard />
            <CardBoard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
