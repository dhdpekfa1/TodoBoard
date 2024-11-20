export interface PageDataType {
  id: number;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  boardData: BoardDataType[];
}
export interface BoardDataType {
  boardId: string | number;
  title: string;
  isChecked?: boolean;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
}
