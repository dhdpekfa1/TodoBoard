import React, { ReactNode, useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { toast } from "@/hooks/use-toast";
import {
  ButtonFill,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@/components/ui";
import { BoardContentType } from "@/app/types/board";
import { useAddContent } from "@/hooks/api";

export interface MarkdownEditorDialogProp {
  children: ReactNode;
  data: BoardContentType | undefined;
  title: string;
  isChecked: boolean;
  boardId: number;
  onUpdate: (updatedBoard: BoardContentType) => void;
}

const MarkdownEditorDialog = ({
  children,
  data,
  title,
  isChecked,
  boardId,
  onUpdate,
}: MarkdownEditorDialogProp) => {
  const addContent = useAddContent();
  const [content, setContent] = useState<string>(data?.content || "");

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

  // TODO: 처음 등록 후 콘텐츠 생성은 되는데 UI에 바로 반영x -> 콘텐츠 중복 생성 가능
  const onSave = async () => {
    try {
      if (!content) {
        toast({
          variant: "destructive",
          title: "필수 항목을 모두 입력하세요.",
          description: "내용을 입력해주세요.",
        });
        return;
      }

      if (data) {
        // 콘텐츠가 이미 있을 경우 업데이트 호출
        onUpdate({
          ...data,
          content,
        });
      } else {
        // 콘텐츠가 없을 경우 추가 호출
        const newContent = await addContent(boardId, undefined, content);
        if (newContent) {
          toast({
            title: "콘텐츠 추가 성공",
            description: "새 콘텐츠가 성공적으로 추가되었습니다.",
          });
          onUpdate(newContent);
        }
      }
    } catch (err) {
      console.error("Error in MarkdownEditorDialog onSave:", err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col mt-2" />
        <DialogTitle>
          <div className="flex items-center justify-start gap-2">
            <Checkbox checked={isChecked} className="h-5 w-5 min-w-5" />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {title}
            </h4>
          </div>
        </DialogTitle>
        <DialogDescription>
          마크다운 에디터를 사용하여 TODO-BOARD의 상세 내용을 기록하세요!
        </DialogDescription>
        <Separator />
        <MarkdownEditor
          className="h-[320px]"
          value={
            typeof data?.content === "string"
              ? data?.content
              : JSON.stringify(data?.content)
          }
          onChange={(value) => setContent(value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <ButtonFill onClick={onSave}>등록</ButtonFill>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { MarkdownEditorDialog };
