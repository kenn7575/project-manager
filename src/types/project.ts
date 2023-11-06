import type { TaskType } from './task';

export interface ProjectType {
    uid: string;
    title: string;
    dateCreated: string;
    tasks: TaskType[];
}