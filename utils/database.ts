import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
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
