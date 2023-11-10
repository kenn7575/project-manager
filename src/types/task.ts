import type { ColumnType } from "./project";

export interface TaskType {
  id: string;
  title: string;
  dateCreated: Date | string;
  columnId: ColumnType["id"];
  description?: string;
  priority: number;
}
