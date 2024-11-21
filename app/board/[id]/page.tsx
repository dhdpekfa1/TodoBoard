"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import { CardBoard, PageBoard } from "@/features/board";
import PageList from "@/features/page-list/PageList";
import { BoardDataType } from "@/app/types/board";
import { addBoardApi, getBoardApi, updateBoardsApi } from "@/app/api/board";
import { useToast } from "@/hooks/use-toast";

const BoardPage = () => {
  const params = useParams();
  const pageId = params?.id;
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBoardData();
  }, []);

  const fetchBoardData = async () => {
    const res = await getBoardApi(Number(pageId));

    if (!res) {
      toast({
        variant: "destructive",
        title: "보드 정보를 불러오지 못했습니다.",
        description: "네트워크를 확인해주세요.",
      });
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

  // 날짜 핸들러 함수
  // const handleDateChange = (
  //   name: keyof PageDataType,
  //   value: Date | undefined
  // ) => {
  //   setPageData((prevState) => ({
  //     ...prevState,
  //     [name]: value || new Date(),
  //   }));
  // };

  return (
    <div className="page">
      <PageList />
      <main className="page__main">
        <PageBoard
          createBoard={createBoard}
          pageId={Number(pageId)}
          boardData={boardData}
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
                  fetchBoardData={fetchBoardData}
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
