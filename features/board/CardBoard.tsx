"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { MarkdownEditorDialog } from "./MarkdownEditorDialog";
import {
  ButtonOutline,
  Button,
  Card,
  Checkbox,
  DeleteButton,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { BoardContentType, BoardDataType } from "@/app/types/board";
import { deleteBoardApi } from "@/app/api/board";
import {
  addContentApi,
  getContentApi,
  updateContentApi,
} from "@/app/api/board_content";

interface CardBoardProps {
  data: BoardDataType;
  onUpdate: (updatedBoard: BoardDataType) => void;
  fetchBoardData: () => void;
}

const CardBoard = ({ data, onUpdate, fetchBoardData }: CardBoardProps) => {
  const [title, setTitle] = useState(data.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    data.startDate ? new Date(data.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data.endDate ? new Date(data.endDate) : undefined
  );
  const [contentData, setContentData] = useState<BoardContentType>({
    contentId: "",
    title: "",
    content: "",
    isChecked: false,
  });
  const [isChecked, setIsChecked] = useState(data.isChecked || false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContentData();
  }, []);

  const fetchContentData = async () => {
    const res = await getContentApi(Number(data.boardId));

    if (res && res.length > 0 && res[0]?.id) {
      setContentData({
        contentId: res[0].id,
        title: res[0].title,
        content: res[0].content,
        isChecked: res[0].is_checked,
      });
    } else {
      setContentData({
        contentId: "",
        title: "",
        content: "",
        isChecked: false,
      });
    }
  };

  // boardContent 생성
  const createContent = async () => {
    if (contentData && contentData.contentId) {
      return;
    }

    const newContent = await addContentApi(Number(data.boardId));
    if (!newContent) {
      console.error("Failed to create content.");
      return;
    }

    setContentData(newContent);
  };

  // boardContent 등록(수정)
  const updateContent = async (updateContent: BoardContentType) => {
    const res = await updateContentApi(updateContent);

    if (!res) {
      console.error("Failed to update content.", res);
      return;
    }

    setContentData({
      ...contentData,
      title: updateContent.title,
      content: updateContent.content,
      isChecked: updateContent.isChecked,
    });
  };

  const onSave = () => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "필수 항목을 모두 입력하세요.",
        description: "제목, 시작일, 종료일을 입력해 주세요.",
      });
      return;
    }
    onUpdate({
      ...data,
      title,
      startDate: startDate?.toISOString() || "",
      endDate: endDate?.toISOString() || "",
      isChecked,
    });
    setIsEditing(false);
  };

  const onDelete = async (id: number) => {
    const res = await deleteBoardApi(id);

    if (!res) {
      toast({
        variant: "destructive",
        title: "다시 시도해주세요.",
        description: "보드 삭제에 실패했습니다.",
      });
      return;
    }
    toast({
      title: "보드 삭제에 성공했습니다.",
    });
    fetchBoardData();
  };

  // 수정 모드일 때만 체크박스 상태 변경
  const handleCheckboxChange = () => {
    if (isEditing) {
      setIsChecked((prevState) => !prevState);
    }
  };

  return (
    <Card className="w-full flex flex-col items-center p-5">
      {/* Card Title */}
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex items-center justify-start gap-2">
          <Checkbox
            id={String(data.boardId)}
            className="w-5 h-5"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="text-xl outline-none bg-white"
            disabled={!isEditing}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronUp className="text-[#6d6d6d]" />
        </Button>
      </div>

      {/* Calendar & ButtonBox */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label={"From"}
            value={startDate}
            disabled={!isEditing}
            onChange={setStartDate}
          />
          <LabelDatePicker
            label={"To"}
            value={endDate}
            disabled={!isEditing}
            onChange={setEndDate}
          />
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button
              variant={"ghost"}
              className="text-[#777] font-normal"
              onClick={onSave}
            >
              저장
            </Button>
          ) : (
            <ButtonOutline onClick={() => setIsEditing(true)}>
              수정
            </ButtonOutline>
          )}

          <DeleteButton onClick={() => onDelete(Number(data.boardId))} />
        </div>
      </div>

      <Separator className="my-3" />

      {/* Add Content Button */}
      <MarkdownEditorDialog data={contentData} onUpdate={updateContent}>
        <Button
          variant={"ghost"}
          className="w-full font-normal text-[rgb(109,109,109)]"
          onClick={createContent}
        >
          {contentData.contentId ? "Check Content" : "Add Contents"}
        </Button>
      </MarkdownEditorDialog>
    </Card>
  );
};

export { CardBoard };
