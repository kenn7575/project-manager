import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../functions/firebase";
import { writable } from "svelte/store";

// Custom store to get a document from Firestore
export function colStore<T>(path: string, filters?: any[], _orderBy?: any) {
  let unsubscribe: () => void;
  let currentData: T | null = null;

  const collectionRef = collection(db, path);

  // Create a query against the collection.
  let _query;
  if (filters && filters.length === 3) {
    _query = query(
      collectionRef,
      where(filters[0], filters[1], filters[2]),
      orderBy(_orderBy, "asc")
    );
  } else {
    _query = collectionRef;
  }

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(_query, (snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });

      // Check if the data is different before updating the store
      if (JSON.stringify(currentData) !== JSON.stringify(documents)) {
        currentData = documents as T;

        set(currentData);
      }
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}
