import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  AddNewButtonFill,
  AddNewButtonOutline,
  Button,
  LabelDatePicker,
  Progress,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { deletePageApi, getPageApi, updatePageApi } from "@/app/api/page";
import { PageDataType } from "@/app/types/board";

interface PageBoardProps {
  pageId: number;
  createBoard: () => Promise<void>;
}

const PageBoard = ({ pageId, createBoard }: PageBoardProps) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    const res = await getPageApi(Number(pageId));
    if (!res) {
      console.log("fetchBoardData :", res);
    }

    const { start_date, end_date, title } = res;

    setTitle(title);
    setStartDate(start_date ? new Date(start_date) : undefined);
    setEndDate(end_date ? new Date(end_date) : undefined);
  };

  const onSave = async () => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "필수 항목을 모두 입력하세요.",
        description: "제목, 시작일, 종료일을 입력해 주세요.",
      });
      return;
    }

    // TODO: 오류 확인
    // 페이지 데이터 업데이트
    const updatedPage: PageDataType = {
      id: pageId,
      title,
      startDate:
        startDate instanceof Date ? startDate.toISOString() : startDate,
      endDate: endDate instanceof Date ? endDate.toISOString() : endDate,
    };

    const res = await updatePageApi(updatedPage);
    if (!res) {
      toast({
        variant: "destructive",
        title: "다시 시도해주세요.",
        description: "페이지 업데이트에 실패했습니다.",
      });
      return;
    }

    toast({
      title: "페이지 업데이트 성공",
      description: "페이지가 성공적으로 업데이트되었습니다.",
    });

    setIsEditing(false);
  };

  const onDelete = async (id: number) => {
    const res = await deletePageApi(id);

    if (!res) {
      toast({
        variant: "destructive",
        title: "다시 시도해주세요.",
        description: "페이지 삭제에 실패했습니다.",
      });
      return;
    }
    toast({
      title: "페이지 삭제에 성공했습니다.",
    });
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
            onClick={() => onDelete(pageId)}
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
