"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { ChevronUp } from "lucide-react";
import { MarkdownEditorDialog } from "./MarkdownEditorDialog";
import { BoardDataType } from "@/app/types/board";

const CardBoard = ({
  data,
  onUpdate,
}: {
  data: BoardDataType;
  onUpdate: (updatedBoard: BoardDataType) => void;
}) => {
  const [title, setTitle] = useState(data.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    data.startDate ? new Date(data.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data.endDate ? new Date(data.endDate) : undefined
  );
  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    onUpdate({
      ...data,
      title,
      startDate: startDate?.toISOString() || "",
      endDate: endDate?.toISOString() || "",
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full flex flex-col items-center p-5">
      {/* Card Title */}
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex items-center justify-start gap-2">
          <Checkbox className="w-5 h-5" />
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
        <div className="flex items-center">
          {isEditing ? (
            <Button
              variant={"ghost"}
              className="text-[#777] font-normal"
              onClick={onSave}
            >
              저장
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              className="text-[#6d6d6d] font-normal"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
          )}
          <Button
            variant={"ghost"}
            className="font-normal text-rose-600 hover:text-rose-600 hover:bg-red-50"
          >
            삭제
          </Button>
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
