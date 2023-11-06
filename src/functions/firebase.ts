// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
import { userStore } from "../stores/userStore";
import { isDoneLoadingStore } from "../stores/loadingStore";
onAuthStateChanged(auth, (user) => {
  isDoneLoadingStore.set(true);
  if (user) {
    userStore.set(user);
  } else {
    userStore.set(null);
  }
});

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
