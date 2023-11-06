import { writable } from "svelte/store";
export const projectStore = writable({
    uid: "",
    title: "",
    dateCreated: new Date(),
    tasks: [],
});