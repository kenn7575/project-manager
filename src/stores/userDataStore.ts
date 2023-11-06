//user data svelte store
import { derived } from "svelte/store";
import { user } from "./userStore";
import { docStore } from "./docStore";
import type { Readable } from "svelte/store";
import type { UserData } from "../types/user";

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
