import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "../functions/firebase";
import { writable } from "svelte/store";

//custom store to get a document from firestore
export function colStore<T>(path: string, filters?: any[]) {
  let unsubscribe: () => void;

  const collectionRef = collection(db, path);

  // Create a query against the collection.
  let _query;
  if (filters && filters.length == 3) {
    _query = query(collectionRef, where(filters[0], filters[1], filters[2]));
  } else {
    _query = collectionRef;
  }
  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(_query, (snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id, ref: doc.ref });
      });
      set((documents as T) ?? null);
    });
    return () => unsubscribe();
  });
  return {
    subscribe,
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
