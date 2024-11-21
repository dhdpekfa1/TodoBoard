import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const ButtonOutline = ({ onClick, children }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-[#e79057] bg-white border border-[#e79057] hover:bg-[#fff9f5]"
    >
      {children}
    </Button>
  );
};

export { ButtonOutline };
