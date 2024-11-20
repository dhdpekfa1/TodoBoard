"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { Calendar as CalendarIcon } from "lucide-react";

interface BasicDatePickerProps {
  date: Date | undefined;
  disabled?: boolean;
  onDateChange: (date: Date | undefined) => void;
}

function BasicDatePicker({
  date,
  disabled,
  onDateChange,
}: BasicDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>날짜를 선택하세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange} // 날짜 선택 시 부모로 전달
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { BasicDatePicker };
