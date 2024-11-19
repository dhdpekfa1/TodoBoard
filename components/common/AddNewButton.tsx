import React from "react";
import { Button } from "../ui";

interface AddNewButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddNewButton: React.FC<AddNewButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="text-[#e79057] bg-white border border-[#e79057] hover:bg-[#fff9f5]"
    >
      Add New Page
    </Button>
  );
};

export { AddNewButton };
