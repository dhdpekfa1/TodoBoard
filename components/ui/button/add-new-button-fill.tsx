import React from "react";
import { Button } from "..";
import { AddNewButtonProps } from "@/app/types/common";

const AddNewButtonFill = ({ onClick, children }: AddNewButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
    >
      {children}
    </Button>
  );
};

export { AddNewButtonFill };
