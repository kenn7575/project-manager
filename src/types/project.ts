import type { TaskType } from "./task";

export interface ProjectType {
  id: string;
  title: string;
  dateCreated: Date;
  tasks: TaskType[];
  ref: any;
  columns: ColumnType[];
}

export interface ColumnType {
  id: string;
  label: string;
  dateCreated: Date;
}
