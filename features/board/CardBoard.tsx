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
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { BoardDataType } from "@/app/types/board";
import { DateRangePicker } from "@/components/common";
import { MarkdownComponent } from "./";
import {
  useDeleteBoard,
  useGetContent,
  useAddContent,
  useUpdateContent,
} from "@/hooks/api";

interface CardBoardProps {
  data: BoardDataType;
  onUpdate: (updatedBoard: BoardDataType) => void;
  fetchBoardData?: () => void;
}

const CardBoard = ({ data, onUpdate }: CardBoardProps) => {
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

  const { contentData, fetchContent } = useGetContent();
  const createContent = useAddContent();
  const updateContent = useUpdateContent();
  const onDeleteBoard = useDeleteBoard();

  useEffect(() => {
    fetchContent(Number(data.boardId));
  }, [data.boardId]);

  // 보드 저장
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

  // // 수정 모드일 때만 체크박스 상태 변경
  const handleCheckboxChange = () => {
    if (isEditing) {
      setIsChecked((prevState) => !prevState);
    }
  };

  return (
    <Card className="w-full flex flex-col items-center p-5">
      {/* Card Title */}
      <div className="w-full flex items-center justify-between mb-5">
        <div className="w-full flex items-center justify-start gap-2">
          <Checkbox
            id={String(data.boardId)}
            className="w-5 h-5"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="w-full text-xl outline-none bg-white"
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
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isEditing={isEditing}
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <ButtonOutline onClick={onSave}>저장</ButtonOutline>
          ) : (
            <ButtonOutline onClick={() => setIsEditing(true)}>
              수정
            </ButtonOutline>
          )}

          <DeleteButton onClick={() => onDeleteBoard(Number(data.boardId))} />
        </div>
      </div>

      {/* 콘텐츠 표시 */}
      {contentData.map((content) => (
        <React.Fragment key={content.contentId}>
          <Separator className="my-3" />
          <MarkdownComponent content={content.content} />
        </React.Fragment>
      ))}

      <Separator className="my-3" />
      {/* Add & Edit Content Button */}
      <MarkdownEditorDialog
        data={contentData[0]}
        onUpdate={updateContent}
        title={title}
        isChecked={isChecked}
      >
        <Button
          variant={"ghost"}
          className="w-full font-normal text-[rgb(109,109,109)]"
          onClick={() =>
            createContent(
              Number(data.boardId),
              Number(contentData[0]?.contentId)
            )
          }
        >
          {contentData.length > 0 ? "Edit Content" : "Add Contents"}
        </Button>
      </MarkdownEditorDialog>
    </Card>
  );
};

export { CardBoard };
