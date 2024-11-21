import React, { ReactNode, useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useToast } from "@/hooks/use-toast";
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
  onUpdate: (updatedBoard: BoardContentType) => void;
}

const MarkdownEditorDialog = ({
  children,
  data,
  onUpdate,
}: MarkdownEditorDialogProp) => {
  const [content, setContent] = useState(data?.content || "");
  const [title, setTitle] = useState(data?.title || "");
  const [isChecked, setIsChecked] = useState(data?.isChecked || false);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setIsChecked(data.isChecked || false);
    }
  }, [data]);

  const onSave = () => {
    try {
      if (!title || !content) {
        toast({
          variant: "destructive",
          title: "필수 항목을 모두 입력하세요.",
          description: "제목과 내용을 입력해 주세요.",
        });
        return;
      }

      if (!data) {
        console.error("data is undefined");
        return;
      }

      onUpdate({
        ...data,
        title,
        content,
        isChecked,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col">
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <Checkbox
                id={String(data?.contentId)}
                checked={isChecked}
                onCheckedChange={() => setIsChecked((prevState) => !prevState)}
                className="w-5 h-5 min-w-5"
              />
              <input
                type="text"
                placeholder="게시물의 제목을 입력하세요."
                className="text-xl outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            마크다운 에디터를 사용해 Todo Board를 꾸며보세요.
          </DialogDescription>
        </DialogHeader>
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
          {title && content ? (
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
