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

export interface MarkdownEditorDialogProp {
  children: ReactNode;
  data: BoardContentType | undefined;
  title: string;
  isChecked: boolean;
  onUpdate: (updatedBoard: BoardContentType) => void;
}

const MarkdownEditorDialog = ({
  children,
  data,
  title,
  isChecked,
  onUpdate,
}: MarkdownEditorDialogProp) => {
  const [content, setContent] = useState<string>(data?.content || "");

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

  const onSave = () => {
    try {
      if (!content) {
        toast({
          variant: "destructive",
          title: "필수 항목을 모두 입력하세요.",
          description: "내용을 입력해주세요.",
        });
        return;
      }

      if (!data) {
        console.error("데이터가 없습니다.");
        return;
      }

      onUpdate({
        ...data,
        content,
      });
    } catch (err) {
      console.error(err);
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
          onChange={(value, viewUpdate) => setContent(value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              취소
            </Button>
          </DialogClose>
          {content ? (
            <DialogClose asChild>
              <ButtonFill onClick={onSave}>등록</ButtonFill>
            </DialogClose>
          ) : (
            <ButtonFill onClick={onSave}>등록</ButtonFill>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { MarkdownEditorDialog };
