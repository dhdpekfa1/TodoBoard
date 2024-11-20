import { PageDataType } from "@/app/types/board";
import {
  AddNewButtonFill,
  AddNewButtonOutline,
  Button,
  LabelDatePicker,
  Progress,
} from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface PageDataWithoutId extends Omit<PageDataType, "id"> {}

interface PageBoardProps {
  data: PageDataType;
  onUpdate: (updatedBoard: PageDataType) => void;
  createBoard: () => Promise<void>;
}

const PageBoard = ({ data, onUpdate, createBoard }: PageBoardProps) => {
  const [title, setTitle] = useState(data?.title || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    data?.startDate ? new Date(data.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data?.endDate ? new Date(data.endDate) : undefined
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("PageBoard - data ==> ", data);
  }, [data]);

  const onSave = () => {
    onUpdate({
      ...data,
      title,
      startDate: startDate?.toISOString() || "",
      endDate: endDate?.toISOString() || "",
    });
    setIsEditing(false);
  };

  const onDelete = async () => {
    console.log("TODO");
  };

  return (
    <div className="w-full p-5 flex flex-col bg-white">
      <div className="flex items-center gap-2">
        <Button variant={"outline"}>
          <ChevronLeft />
        </Button>
        {isEditing ? (
          <AddNewButtonFill onClick={onSave}>저장</AddNewButtonFill>
        ) : (
          <AddNewButtonOutline onClick={() => setIsEditing(true)}>
            수정
          </AddNewButtonOutline>
        )}
        {isEditing && (
          <Button
            onClick={onDelete}
            className="font-normal bg-red-500 text-white hover:text-rose-600 hover:bg-red-50"
          >
            삭제
          </Button>
        )}
      </div>
      <div className="w-full flex flex-col gap-4 mt-4">
        {/* 제목 input */}
        <input
          type="text"
          placeholder="Enter Title Here"
          disabled={!isEditing}
          className="text-2xl font-bold outline-none bg-white placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* 진행도 그래프 */}
        <div className="flex items-center gap-4 mb-4">
          <small className="text-sm font-medium text-gray-600">
            TODO: 1/10 Completed
          </small>
          <Progress className="w-60 h-3" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label="From"
            value={startDate}
            disabled={!isEditing}
            onChange={setStartDate}
          />
          <LabelDatePicker
            label="To"
            value={endDate}
            disabled={!isEditing}
            onChange={setEndDate}
          />
          <AddNewButtonFill onClick={createBoard}>
            Add New Board
          </AddNewButtonFill>
        </div>
      </div>
    </div>
  );
};

export { PageBoard };
