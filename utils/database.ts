import {
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { GoogleUser } from "./Interfaces";
import { User as FirebaseUser } from "firebase/auth";

export const configurePersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("Persistence set localStorage");
  } catch (error) {
    console.log(error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    const user = result.user;
    console.log(user);

    const mappedUser: GoogleUser = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
    };

    return mappedUser;
  } catch (error) {
    console.log(error);
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (): Promise<FirebaseUser | null> => {
  try {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.log("Error getting current user:", error);
    return null;
  }
};
