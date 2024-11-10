import { IoCarSport } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdAttachMoney } from "react-icons/md";
import { FaOilCan } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { MdOutlineHistory } from "react-icons/md";
import { signInWithGoogle } from "../../utils/database";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { db } from "../../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { User } from "../../utils/Interfaces";

export default function Index() {
  const navigate = useNavigate();
  const { addUser, language, changeLanguage } = useContext(AuthContext);

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
            // uid: user.uid,
            email: user.email,
            name: user.displayName || "",
            profilePicture: user.photoURL || "",
            joinedAt: new Date().toISOString(),
            car: {
              summary: {
                model: "",
                year: 0,
                mileage: 0,
                lastServiceDate: "",
              },
              overview: [],
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

  return (
    <div className="relative">
      <header className="sticky top-0 flex items-center justify-between bg-blue-950 px-8 py-3">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} /> Drive Check
        </div>
        <div className="text-lg font-bold uppercase">
          {language === "esp"
            ? "Control de mantenimiento"
            : "Maintenance tracker"}
        </div>
        <div
          onClick={signInUser}
          className="flex items-center gap-2 rounded-lg border border-white bg-white p-1 px-3 text-blue-950 transition hover:cursor-pointer hover:bg-transparent hover:text-white"
        >
          <FcGoogle size={25} />{" "}
          {language === "esp" ? "Ingresar Con Google" : "Sign In With Google"}
        </div>
        <div className="flex cursor-pointer overflow-hidden rounded border border-blue-950">
          <div
            className={`px-1 text-white hover:bg-blue-900 ${
              language === "esp" ? "bg-blue-800 font-bold" : "bg-slate-600"
            }`}
            onClick={() => changeLanguage("esp")}
          >
            Esp
          </div>
          <div
            className={`px-1 text-white hover:bg-blue-900 ${
              language === "eng" ? "bg-blue-800 font-bold" : "bg-slate-600"
            }`}
            onClick={() => changeLanguage("eng")}
          >
            Eng
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col bg-slate-200 p-8 text-blue-950">
        <div className="flex items-center justify-around">
          <div className="text-xl font-bold text-blue-950">
            <div className="text-2xl">
              {language === "esp"
                ? "Drive Check te ayuda con tu auto"
                : "Drive Check always helps your car"}
            </div>
            <ul className="flex flex-col gap-3 pt-4">
              <li className="flex items-center gap-4">
                <LuMilestone size={35} className="text-amber-500" />{" "}
                {language === "esp"
                  ? "Seguimiento de kilometraje"
                  : "Mileage Tracking"}
              </li>
              <li className="flex items-center gap-4">
                <FaOilCan size={32} className="text-amber-500" />{" "}
                {language === "esp"
                  ? "Recordatorios de Mantenimiento"
                  : "Service reminders"}
              </li>
              <li className="flex items-center gap-4">
                <MdOutlineHistory size={32} className="text-amber-500" />
                {language === "esp"
                  ? "Historial de reparaciones"
                  : "Repair's history"}
              </li>
            </ul>
          </div>
          <img
            src="../../assets/car1_transp-01.png"
            alt="car"
            className="w-1/2"
          />
        </div>
        <div className="text-center text-xl font-bold text-blue-950">
          {language === "esp" ? "CARACTERÍSTICAS DE LA APP" : "APP FEATURES"}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <MdAttachMoney size={35} className="text-amber-500" />
            <div>
              <div className="text-center font-bold">
                {language === "esp"
                  ? "Controla tus gastos"
                  : "Control your expenses"}
              </div>
              <div>
                {language === "esp"
                  ? "Conoce los costos de uso de tu vehículo y planea tus gastos."
                  : "Know your vehicle's running costs and plan for your expenses."}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <FaOilCan size={35} className="text-amber-500" />
            <div>
              <div className="text-center font-bold">
                {language === "esp"
                  ? "Recordatorios de Mantenimiento"
                  : "Service reminders"}
              </div>
              <div>
                {language === "esp"
                  ? "No pierdas de vista el mantenimiento y los servicios de tu auto."
                  : "Don’t lose sight of your maintenance and services."}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <LuMilestone size={35} className="text-amber-500" />
            <div>
              <div className="text-center font-bold">
                {language === "esp"
                  ? "Guarda tu kilometraje"
                  : "Mileage recording"}
              </div>
              <div>
                {language === "esp"
                  ? "Lleva el seguimiento de tu kilometraje de forma fácil y constante."
                  : "Keep your mileage always tracked easily."}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
