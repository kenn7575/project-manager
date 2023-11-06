export interface TaskType {
    uid: string;
    title: string;
    dateCreated: Date;
    status: "todo" | "in-progress" | "done";
    description: string;
}