"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import {
  ButtonFill,
  ButtonOutline,
  Button,
  ConfirmDialog,
  Progress,
} from "@/components/ui";
import { BoardDataType } from "@/app/types/board";
import { DateRangePicker } from "@/components/common";
import { useDeletePage, useGetPage, useUpdatePage } from "@/hooks/api";

interface PageBoardProps {
  pageId: number;
  createBoard: () => Promise<void>;
  boardData: BoardDataType[];
}

const PageBoard = ({ pageId, boardData, createBoard }: PageBoardProps) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { page, fetchPage } = useGetPage();
  const updatePage = useUpdatePage();
  const onDelete = useDeletePage();

  useEffect(() => {
    fetchPage(pageId);
  }, [pageId]);

  useEffect(() => {
    if (page) {
      setTitle(page.title || "");
      setStartDate(page.startDate ? new Date(page.startDate) : undefined);
      setEndDate(page.endDate ? new Date(page.endDate) : undefined);
    }
  }, [page]);

  const onSave = async () => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "필수 항목을 모두 입력하세요.",
        description: "제목, 시작일, 종료일을 입력해 주세요.",
      });
      return;
    }

    const updatedPage = {
      id: pageId,
      title,
      startDate,
      endDate,
    };

    const success = await updatePage(updatedPage);

    if (success) {
      toast({
        title: "성공",
        description: "페이지가 성공적으로 업데이트되었습니다.",
      });

      setIsEditing(false);
    }
  };

  // 완료된 보드 항목을 필터링
  const completedData = boardData.filter((data) => data.isChecked);

  // 진행도 계산
  const completionPercentage =
    boardData.length > 0 ? (completedData.length / boardData.length) * 100 : 0;

  return (
    <div className="w-full p-5 flex flex-col bg-white">
      <div className="flex items-center justify-between gap-2 bg-white">
        <Button variant={"outline"} onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <div className="flex items-center gap-4">
          {isEditing ? (
            <ButtonFill onClick={onSave}>저장</ButtonFill>
          ) : (
            <ButtonOutline onClick={() => setIsEditing(true)}>
              수정
            </ButtonOutline>
          )}
          <ConfirmDialog onClick={() => onDelete(pageId)} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 mt-4">
        {/* 제목 input */}
        <input
          type="text"
          placeholder="페이지 제목을 입력해주세요."
          disabled={!isEditing}
          className="text-2xl font-bold outline-none bg-white placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* 진행도 그래프 */}
        <div className="flex items-center gap-4 mb-4">
          <small className="text-sm font-medium text-gray-600">
            {completedData.length} / {boardData.length} Completed
          </small>
          <Progress value={completionPercentage} className="w-60 h-3" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <div className="flex items-center gap-5">
          <DateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            isEditing={isEditing}
          />
        </div>
        <ButtonOutline onClick={createBoard}>Add New Board</ButtonOutline>
      </div>
    </div>
  );
};

export { PageBoard };
