export interface TaskType {
  id: string;
  title: string;
  dateCreated: Date | string;
  status: string; // "todo" | "in-progress" | "done"
  description: string;
  priority: number;
}
