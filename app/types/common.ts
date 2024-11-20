import { ReactNode } from "react";

export interface AddNewButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
