import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../functions/firebase";
import { writable } from "svelte/store";

//custom store to get a document from firestore
export function docStore<T>(path: string) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

/*
? make a store like this: (in this file)
export const cakes = docStore<UserData>(`cakes/${$user.uid}`);

? use it like this: (in a component, other store or function)
import { cakes } from "../stores/cakesStore";
cakes.subscribe((data) => {
  console.log("cakes", data);
});
*/
