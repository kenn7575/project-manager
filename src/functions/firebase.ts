// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { errorStore } from "../stores/errorStore";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqpFLgK7jeq2-hUVJmSXtXkVnc0zncf8k",
  authDomain: "project-manager-a1e44.firebaseapp.com",
  projectId: "project-manager-a1e44",
  storageBucket: "project-manager-a1e44.appspot.com",
  messagingSenderId: "1020577327341",
  appId: "1:1020577327341:web:60f354731264d08a8844e4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

//update user store

export function LogOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

export function LogIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
//check if user has a document in the users collection
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
export async function checkIfUserExistsInDB(user) {
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    //return data
    return querySnapshot.docs[0].data();
  } else {
    //create user document
    await createUserDocument(user);
  }
}

//create user document
export async function createUserDocument(user) {
  const userRef = doc(db, "users", user.uid);
  const newUser = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
  await setDoc(userRef, newUser);
}

//set document function
export async function setDocument(path, data) {
  const docRef = doc(db, path);
  await setDoc(docRef, data);
}

//update document function
export async function updateDocument(path, data) {
  const docRef = doc(db, path);
  await updateDoc(docRef, data);
}

//add document to collection
export async function addDocument(path, data) {
  const docRef = collection(db, path);
  await addDoc(docRef, data);
}
//delete document
export async function deleteDocument(path) {
  const docRef = doc(db, path);
  await deleteDoc(docRef);
}
//get document
export async function getDocument(path) {
  const docRef = doc(db, path);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}
