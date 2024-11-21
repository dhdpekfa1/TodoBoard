import { ReactNode } from "react";

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
