import { writable } from "svelte/store";
import { auth } from "../functions/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isDoneLoadingStore } from "../stores/loadingStore";

function userStore() {
  let unsubscribe: () => void;

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("userStore state", user);
      isDoneLoadingStore.set(true);
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
