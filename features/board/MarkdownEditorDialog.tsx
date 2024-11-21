import React, { ReactNode, useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useToast } from "@/hooks/use-toast";
import {
  AddNewButtonFill,
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
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const onSave = () => {
    if (!data?.title) {
      toast({
        variant: "destructive",
        title: "필수 항목을 모두 입력하세요.",
        description: "제목과 내용을 입력해 주세요.",
      });
      return;
    }

    onUpdate({
      ...data,
      title,
      content,
      isChecked: data?.isChecked || false,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col">
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <Checkbox className="w-5 h-5 min-w-5" />
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
          value={content}
          onChange={(value, viewUpdate) => setContent(value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              취소
            </Button>
          </DialogClose>
          <AddNewButtonFill onClick={onSave}>등록</AddNewButtonFill>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { MarkdownEditorDialog };
