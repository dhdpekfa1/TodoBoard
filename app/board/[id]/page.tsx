"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import { CardBoard, PageBoard } from "@/features/board";
import PageList from "@/features/page-list/PageList";
import { BoardDataType } from "@/app/types/board";
import { useToast } from "@/hooks/use-toast";
import { useAddBoard, useGetBoardList, useUpdateBoard } from "@/hooks/api";
import { useAtom } from "jotai";
import { boardsAtom } from "@/stores/atoms";

const BoardPage = () => {
  const params = useParams();
  const pageId = params?.id;
  const { toast } = useToast();
  const [, setBoards] = useAtom(boardsAtom);
  const { boards, fetchBoards } = useGetBoardList();
  const addBoard = useAddBoard();
  const updateBoard = useUpdateBoard();

  useEffect(() => {
    if (pageId) {
      fetchBoards(Number(pageId));
    }
  }, [pageId]);

  const createBoard = async () => {
    if (!pageId) {
      toast({
        variant: "destructive",
        title: "잘못된 요청",
        description: "페이지 ID가 유효하지 않습니다.",
      });
      return;
    }

    const newBoard = await addBoard(Number(pageId));

    if (!newBoard) {
      console.error("Failed to create board.");
      return;
    }

    setBoards((prevState) => [...prevState, newBoard]);
  };

  const onSaveBoard = async (updatedBoard: BoardDataType) => {
    const success = await updateBoard(updatedBoard);

    if (!success) {
      console.error("Failed to update board.");
      return;
    }

    console.log("Board updated successfully.");
  };

  return (
    <div className="page">
      <PageList />
      <main className="page__main">
        <PageBoard
          createBoard={createBoard}
          pageId={Number(pageId)}
          boardData={boards}
        />
        <div className={styles.body}>
          {!boards.length ? (
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
              {boards.map((board) => (
                <CardBoard
                  key={board.boardId}
                  data={board}
                  onUpdate={onSaveBoard}
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
