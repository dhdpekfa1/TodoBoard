"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
  AddNewButtonFill,
  Button,
  LabelDatePicker,
  Progress,
} from "@/components/ui";
import { CardBoard } from "@/features/board";
import styles from "./page.module.scss";
import { BoardDataType, PageDataType } from "@/app/types/board";
import { getPageApi, updatePageApi } from "@/app/api/page";
import { addBoardApi, getBoardApi, updateBoardsApi } from "@/app/api/board";
import { toast } from "@/hooks/use-toast";
import PageList from "@/features/page-list/PageList";

const BoardPage = () => {
  const params = useParams();
  const pageId = params?.id;
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const [pageData, setPageData] = useState<PageDataType>({
    id: Number(pageId),
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    boardData: boardData,
  });

  useEffect(() => {
    fetchPageData();
    fetchBoardData();
  }, []);

  const fetchPageData = async () => {
    const res = await getPageApi(Number(pageId));
    if (res) {
      setPageData(res);
    }
  };

  const fetchBoardData = async () => {
    const res = await getBoardApi(pageData.id);

    if (!res) {
      console.log("fetchBoardData :", res);
    }
    setBoardData(res);
  };

  const onSave = async () => {
    try {
      const res = await updatePageApi(
        pageData.id,
        pageData.title,
        pageData.startDate,
        pageData.endDate
      );

      if (res) {
        toast({
          title: "저장 완료",
          description: "페이지가 성공적으로 업데이트되었습니다.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "저장 실패",
          description: "페이지 업데이트 중 문제가 발생했습니다.",
        });
      }
    } catch (err) {
      console.error("Error in onSave:", err);
      toast({
        variant: "destructive",
        title: "저장 실패",
        description: "페이지 업데이트 중 문제가 발생했습니다.",
      });
    }
  };

  const createBoard = async () => {
    const newBoard = await addBoardApi(pageData.id);
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

  // 공통 핸들러 함수
  const handlePageDataChange = (name: string, value: any) => {
    setPageData((prevState) => ({
      ...prevState,
      [name]: value,
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
      {/* <PageList pageData={pageData} /> */}
      <main className="page__main">
        <div className={styles.header}>
          <div className={styles[`header__btn-box`]}>
            <Button variant={"outline"}>
              <ChevronLeft />
            </Button>
            <Button variant={"secondary"} onClick={onSave}>
              저장
            </Button>
          </div>
          <div className={styles.header__top}>
            {/* 제목 input */}
            <input
              type="text"
              placeholder="Enter Title Here"
              className={styles.header__top__input}
              value={pageData.title}
              onChange={(e) => handlePageDataChange("title", e.target.value)}
            />
            {/* 진행도 그래프 */}
            <div className="flex items-center justify-start gap-4 mb-4">
              <small className="text-sm font-medium leading-none text-[#6d6d6d]">
                TODO: 1/10 Completed
              </small>
              <Progress className="w-60 h-3" />
            </div>
          </div>
          <div className={styles.header__bottom}>
            <div className="flex items-center gap-5">
              <LabelDatePicker
                label="From"
                value={pageData.startDate}
                disabled={false}
                onChange={(date) => handleDateChange("startDate", date)}
              />
              <LabelDatePicker
                label="To"
                value={pageData.endDate}
                disabled={false}
                onChange={(date) => handleDateChange("endDate", date)}
              />
              <AddNewButtonFill onClick={createBoard}>
                Add New Board
              </AddNewButtonFill>
            </div>
          </div>
        </div>

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
