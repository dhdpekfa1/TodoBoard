"use client";

import React from "react";
import {
  Button,
  Card,
  Checkbox,
  LabelDatePicker,
  Separator,
} from "@/components/ui";

import { ChevronUp } from "lucide-react";
import { MarkdownEditorDialog } from "./MarkdownEditorDialog";

const CardBoard = () => {
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

      {/* AddButton Click */}
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
