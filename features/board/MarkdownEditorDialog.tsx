import React, { ReactNode } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

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
  LabelDatePicker,
  Separator,
} from "@/components/ui";

export interface MarkdownEditorDialogProp {
  children: ReactNode;
}

const MarkdownEditorDialog = ({ children }: MarkdownEditorDialogProp) => {
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
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            마크다운 에디터를 사용해 Todo Board를 꾸며보세요.
          </DialogDescription>
        </DialogHeader>
        {/* Calender */}
        <div className="flex items-center gap-5">
          <LabelDatePicker label={"From"} />
          <LabelDatePicker label={"To"} />
        </div>
        <Separator />
        {/* MarkdownEditor */}
        <MarkdownEditor className="h-[320px]" />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              취소
            </Button>
          </DialogClose>
          <AddNewButtonFill onClick={() => {}}>등록</AddNewButtonFill>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { MarkdownEditorDialog };
