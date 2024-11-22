import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const ButtonOutline = ({ onClick, children }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-[#517157] bg-white border border-[#517157] hover:text-white hover:bg-[#517157] active:bg-[#38503d] hover:shadow-lg"
    >
      {children}
    </Button>
  );
};

export { ButtonOutline };
