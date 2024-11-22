import React, { Dispatch, SetStateAction } from "react";

import { LabelDatePicker } from "../ui";

interface DateRangePickerProps {
  startDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  isEditing: boolean;
}

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isEditing,
}: DateRangePickerProps) => {
  // From 날짜 변경 시 처리
  const handleStartDateChange = (date: Date | undefined) => {
    if (!endDate || (date && new Date(date) <= new Date(endDate))) {
      setStartDate(date);
    }
  };

  // To 날짜 변경 시 처리
  const handleEndDateChange = (date: Date | undefined) => {
    if (!startDate || (date && new Date(date) >= new Date(startDate))) {
      setEndDate(date);
    }
  };
  return (
    <div className="flex items-center gap-5">
      <LabelDatePicker
        label={"From"}
        value={startDate}
        onChange={handleStartDateChange}
        disabled={!isEditing}
      />
      <LabelDatePicker
        label={"To"}
        value={endDate}
        onChange={handleEndDateChange}
        disabled={!isEditing}
      />
    </div>
  );
};

export { DateRangePicker };
