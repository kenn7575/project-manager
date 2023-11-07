export interface TaskType {
    id: string;
    title: string;
    dateCreated: Date | string;
    columnId: number; // TODO: use project column id
    description: string;
}