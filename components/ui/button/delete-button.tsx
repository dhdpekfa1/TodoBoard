import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const DeleteButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className=" text-rose-700  bg-rose-300  hover:text-rose-700 hover:bg-rose-400"
      // border-[#e79057]
    >
      삭제
    </Button>
  );
};

export { DeleteButton };
