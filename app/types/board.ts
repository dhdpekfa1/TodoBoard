export interface PageDataType {
  id: number;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
}
export interface BoardDataType {
  boardId: string | number;
  title: string;
  isChecked?: boolean;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
}
