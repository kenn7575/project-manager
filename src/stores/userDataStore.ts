//user data svelte store
import { derived } from "svelte/store";
import { user } from "./userStore";
import { docStore } from "./docStore";
import { colStore } from "./colStore";
import type { Readable } from "svelte/store";
import type { UserData } from "../types/user";
import { auth } from "../functions/firebase";

//this loads the user store and then gets and user data and updates the data automatically
export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null);
    }
  }
);

export const userProjects: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return colStore<UserData>(`projects`, [
        "users",
        "array-contains",
        auth.currentUser?.uid,
      ]).subscribe(set);
    } else {
      set(null);
    }
  }
);
