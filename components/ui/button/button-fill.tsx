import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const ButtonFill = ({ onClick, children }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-white bg-[#517157] hover:bg-[#415c47] hover:ring-1 hover:ring-[#415c47] hover:ring-offset-1 active:bg-[#38503d] hover:shadow-lg"
    >
      {children}
    </Button>
  );
};

export { ButtonFill };
