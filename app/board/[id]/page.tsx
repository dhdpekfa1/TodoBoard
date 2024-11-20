"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CardBoard, PageBoard } from "@/features/board";
import styles from "./page.module.scss";
import { BoardDataType, PageDataType } from "@/app/types/board";
import { getPageApi, updatePageApi } from "@/app/api/page";
import { addBoardApi, getBoardApi, updateBoardsApi } from "@/app/api/board";
import PageList from "@/features/page-list/PageList";

const BoardPage = () => {
  const params = useParams();
  const pageId = params?.id;
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const [pageData, setPageData] = useState<PageDataType[]>([]);

  useEffect(() => {
    fetchPageData();
    fetchBoardData();
    // console.log(pageData);
  }, []);

  // useEffect(() => {
  //   console.log("Page data updated:", pageData);
  // }, [pageData]);

  const fetchPageData = async () => {
    const res = await getPageApi(Number(pageId));
    if (!res) {
      console.log("fetchBoardData :", res);
    }
    setPageData(res);
    // console.log("res", res);
    // console.log("pageData", pageData);
  };

  const fetchBoardData = async () => {
    const res = await getBoardApi(Number(pageId));

    if (!res) {
      console.log("fetchBoardData :", res);
    }
    setBoardData(res);
  };

  const createBoard = async () => {
    const newBoard = await addBoardApi(Number(pageId));
    if (!newBoard) {
      console.error("Failed to create board.");
      return;
    }

    setBoardData((prevState) => [...prevState, newBoard]);
  };

  const updateBoard = async (updatedBoard: BoardDataType) => {
    const res = await updateBoardsApi(updatedBoard);
    if (!res) {
      console.error("Failed to update board.", res);
    }

    setBoardData((prevState) =>
      prevState.map((board) =>
        board.boardId === updatedBoard.boardId ? updatedBoard : board
      )
    );
  };

  // TODO: 에러 확인
  const updatePage = async (updatedPage: PageDataType) => {
    const res = await updatePageApi(updatedPage);
    if (!res) {
      console.error("Failed to update page.", res);
      return;
    }

    setPageData((prevState) => ({
      ...prevState,
      title: updatedPage.title,
      startDate: updatedPage.startDate,
      endDate: updatedPage.endDate,
    }));
  };

  // 날짜 핸들러 함수
  const handleDateChange = (
    name: keyof PageDataType,
    value: Date | undefined
  ) => {
    setPageData((prevState) => ({
      ...prevState,
      [name]: value || new Date(),
    }));
  };

  return (
    <div className="page">
      <PageList />
      <main className="page__main">
        <PageBoard
          data={pageData[0]}
          onUpdate={updatePage}
          createBoard={createBoard}
        />
        <div className={styles.body}>
          {!boardData.length ? (
            <div className={styles.body__noData}>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-[#454545]">
                There is no board yet.
              </h3>
              <div className="flex flex-col gap-3">
                <small className="text-sm font-normal leading-none text-[#454545]">
                  Click the button and start flashing!
                </small>
              </div>
            </div>
          ) : (
            <div className={styles.body__isData}>
              {boardData.map((data) => (
                <CardBoard
                  key={data.boardId}
                  data={data}
                  onUpdate={updateBoard}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
