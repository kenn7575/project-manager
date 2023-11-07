export interface TaskType {
    uid: string;
    title: string;
    dateCreated: Date | string;
    status: string; // "todo" | "in-progress" | "done"
    description: string;
}