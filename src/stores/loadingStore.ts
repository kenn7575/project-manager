//loading svelte store
import { writable } from "svelte/store";
export const isDoneLoadingStore = writable(false);
