import type { TaskType } from './task';

export interface ProjectType {
    id: string;
    title: string;
    dateCreated: Date;
    tasks: TaskType[];
}