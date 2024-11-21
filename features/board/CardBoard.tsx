"use client";

import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
import { MarkdownEditorDialog } from "./MarkdownEditorDialog";
import {
  AddNewButtonOutline,
  Button,
  Card,
  Checkbox,
  DeleteButton,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { BoardDataType } from "@/app/types/board";
import { deleteBoardApi } from "@/app/api/board";

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
  const [isChecked, setIsChecked] = useState(data.isChecked || false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const onSave = () => {
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
            // disabled={!isEditing}
            onCheckedChange={handleCheckboxChange}
          />
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="text-xl outline-none"
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
            <AddNewButtonOutline onClick={() => setIsEditing(true)}>
              수정
            </AddNewButtonOutline>
          )}

          <DeleteButton onClick={() => onDelete(Number(data.boardId))} />
        </div>
      </div>

      <Separator className="my-3" />

      {/* Add Content Button */}
      <MarkdownEditorDialog>
        <Button
          variant={"ghost"}
          className="w-full font-normal text-[rgb(109,109,109)]"
        >
          Add Contents
        </Button>
      </MarkdownEditorDialog>
    </Card>
  );
};

export { CardBoard };
