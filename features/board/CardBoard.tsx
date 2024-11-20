"use client";

import React, { ReactNode } from "react";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Separator,
} from "@/components/ui";

import { ChevronUp } from "lucide-react";

interface CardBoardProps {
  children?: ReactNode;
}

const CardBoard = ({ children }: CardBoardProps) => {
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
            disabled={true}
          />
        </div>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronUp className="text-[#6d6d6d]" />
        </Button>
      </div>

      {/* Calender & buttonBox */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <LabelDatePicker label={"From"} />
          <LabelDatePicker label={"To"} />
        </div>
        <div className="flex items-center">
          <Button variant={"ghost"} className="text-[#6d6d6d] font-normal">
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-rose-600 hover:text-rose-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>

      <Separator className="my-3" />

      {/* AddButton */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-full font-normal text-[#6D6D6D]"
          >
            Add Contents
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export { CardBoard };
