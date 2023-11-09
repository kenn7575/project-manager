import { writable } from "svelte/store";
import { auth } from "../functions/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isDoneLoadingStore } from "../stores/loadingStore";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../functions/firebase";

function userStore() {
  let unsubscribe: () => void;

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      //check if user doc exists

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
