import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const DeleteButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      variant="outline"
      className="text-rose-500 border border-rose-500 hover:text-white hover:bg-red-500"
      onClick={(e) => onClick(e)}
    >
      삭제
    </Button>
  );
};

export { DeleteButton };
