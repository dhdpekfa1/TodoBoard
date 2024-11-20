import { BasicDatePicker } from "./date-picker";

interface LabelDatePickerProps {
  label: string;
  value: Date | undefined;
  disabled: boolean;
  onChange: (date: Date | undefined) => void;
}

function LabelDatePicker({
  label,
  value,
  disabled = false,
  onChange,
}: LabelDatePickerProps) {
  return (
    <div className="max-w-64 flex items-center gap-3">
      <small className="text-sm font-medium leading-none text-[#6D6D6D]">
        {label}
      </small>
      <BasicDatePicker
        date={value}
        disabled={disabled}
        onDateChange={onChange}
      />
    </div>
  );
}

export { LabelDatePicker };
