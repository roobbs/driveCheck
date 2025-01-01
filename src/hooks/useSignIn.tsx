import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/database";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { User } from "../../utils/Interfaces";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";

export function useSignIn() {
  const navigate = useNavigate();
  const { addUser, language } = useContext(AuthContext);

  const signInUser = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          addUser(userData as User);
          console.log("logged user:", { ...user, ...userData });
          console.log("User signed in correctly");
        } else {
          console.log("User not found in Firestore, it will be created");

          const newUser: User = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "",
            profilePicture: user.photoURL || "",
            joinedAt: new Date().toISOString(),
            unitOfMeasure: language === "esp" ? "km" : "mi",
            car: {
              summary: {
                brand: "",
                model: "",
                year: 0,
                odometer: 0,
              },
              overview: [
                {
                  name: "Oil Level",
                  nameEs: "Nivel de Aceite",
                  level: "",
                  date: "",
                },
                {
                  name: "Battery Voltage",
                  nameEs: "Voltaje de Batería",
                  level: "",
                  date: "",
                },
                {
                  name: "Tire Pressure",
                  nameEs: "Presión de Neumáticos",
                  level: "",
                  date: "",
                },
                {
                  name: "Coolant Level",
                  nameEs: "Nivel de Anticongelante",
                  level: "",
                  date: "",
                },
                {
                  name: "Steering Wheel Oil Level",
                  nameEs: "Nivel de Aceite de Volante",
                  level: "",
                  date: "",
                },
              ],
              upcomingReminders: [],
              maintenanceHistory: [],
            },
          };

          await setDoc(userRef, newUser);
          console.log("New user created:", { ...user, ...newUser });
          console.log("User signed in correctly");
        }

        navigate("/home");
      }
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  return { signInUser };
}
