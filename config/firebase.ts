import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; only for analytics

const firebaseConfig = {
  apiKey: "AIzaSyA1AN6wbrVW-OiA7T5OBNqiej0D1SRbDiM",
  authDomain: "drivecheck-87bfc.firebaseapp.com",
  projectId: "drivecheck-87bfc",
  storageBucket: "drivecheck-87bfc.appspot.com",
  messagingSenderId: "92110225868",
  appId: "1:92110225868:web:a0e4116a0c058002f31d69",
  measurementId: "G-4BD02RVJE3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
// const analytics = getAnalytics(app);
