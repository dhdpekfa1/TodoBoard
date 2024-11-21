import React from "react";
import { Button } from "..";
import { ButtonProps } from "@/app/types/common";

const DeleteButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className=" text-white  bg-red-500  hover:text-white hover:bg-red-600 border border-red-500"
    >
      삭제
    </Button>
  );
};

export { DeleteButton };
