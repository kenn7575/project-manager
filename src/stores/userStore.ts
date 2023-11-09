import { writable } from "svelte/store";
import { auth } from "../functions/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isDoneLoadingStore } from "../stores/loadingStore";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../functions/firebase";

async function userStore() {
  let unsubscribe: () => void;

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      //check if user doc exists
      const docRef = doc(db, "users/" + auth.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        //create user document
        const newUser = {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          dateCreated: new Date(),
        };
        await setDoc(docRef, newUser);
      }
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
