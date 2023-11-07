import { writable } from "svelte/store";

var projectId;

function getId() {
    const url = window.location.href.split('/')

    projectId = url.pop();
    
    if (url.pop() !== 'project') return projectId = null;
}

export const projectStore = writable({
    uid: getId(),
    title: "",
    dateCreated: new Date(),
    tasks: [],
});