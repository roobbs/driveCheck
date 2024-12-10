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
            uid: user.uid,
            email: user.email,
            name: user.displayName || "",
            profilePicture: user.photoURL || "",
            joinedAt: new Date().toISOString(),
            car: {
              summary: {
                brand: "",
                model: "",
                year: 0,
                mileage: 0,
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

  return (
    <div>
      <header className="sticky top-0 flex items-center justify-between gap-4 bg-blue-950 px-8 py-3">
        <div className="1000p:flex-col-reverse flex items-center gap-2">
          <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
            <IoCarSport size={40} />{" "}
            <span className="490p:hidden">Drive Check</span>
          </div>
          <div className="580p:hidden text-lg font-bold uppercase">
            {language === "esp"
              ? "Control de mantenimiento"
              : "Maintenance tracker"}
          </div>
        </div>
        <div className="680p:flex-col-reverse 680p:gap-3 750p:gap-4 flex items-center gap-8">
          <div
            onClick={signInUser}
            className="flex items-center gap-2 rounded-lg border border-white bg-white p-1 px-3 text-blue-950 transition hover:cursor-pointer hover:bg-transparent hover:text-white"
          >
            <FcGoogle size={25} />{" "}
            {language === "esp" ? "Ingresar Con Google" : "Sign In With Google"}
          </div>
          <div className="flex cursor-pointer overflow-hidden rounded border border-blue-950">
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                language === "esp" ? "bg-blue-800 font-bold" : "bg-slate-600"
              }`}
              onClick={() => changeLanguage("esp")}
            >
              Es <img src="../../assets/es_MX.png" alt="" />
            </div>
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                language === "eng" ? "bg-blue-800 font-bold" : "bg-slate-600"
              }`}
              onClick={() => changeLanguage("eng")}
            >
              En <img src="../../assets/en_US.png" alt="" />
            </div>
          </div>
        </div>
      </header>

      <main className="390p:p-4 flex flex-1 flex-col bg-slate-50 p-8 text-gray-800">
        <div className="flex flex-wrap items-center justify-around">
          <div className="490p:text-lg text-xl font-bold">
            <div className="490p:text-xl rounded-xl bg-blue-100 px-4 py-2 text-center text-2xl text-blue-600 shadow-md">
              {language === "esp"
                ? "Drive Check te ayuda con tu auto"
                : "Drive Check always helps your car"}
            </div>
            <ul className="flex flex-col gap-4 pt-4">
              <li className="flex items-center gap-4">
                <LuMilestone size={35} className="text-blue-500" />
                {language === "esp"
                  ? "Seguimiento de kilometraje"
                  : "Mileage Tracking"}
              </li>
              <li className="flex items-center gap-4">
                <FaOilCan size={32} className="text-blue-500" />
                {language === "esp"
                  ? "Recordatorios de Mantenimiento"
                  : "Service reminders"}
              </li>
              <li className="flex items-center gap-4">
                <MdOutlineHistory size={32} className="text-blue-500" />
                {language === "esp"
                  ? "Historial de reparaciones"
                  : "Repair's history"}
              </li>
            </ul>
          </div>
          <img
            src="../../assets/car1_transp-01.png"
            alt="car"
            className="750p:w-3/4 680p:w-11/12 w-2/5"
          />
        </div>

        <div className="mt-12 border-b-2 border-blue-300 py-1 text-center text-2xl font-bold text-blue-600">
          {language === "esp" ? "Características de la App" : "App Features"}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="390p:p-1 flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
            <MdAttachMoney size={35} className="text-yellow-400" />
            <div>
              <div className="text-center font-bold text-gray-800">
                {language === "esp"
                  ? "Controla tus gastos"
                  : "Control your expenses"}
              </div>
              <div className="text-sm text-gray-600">
                {language === "esp"
                  ? "Conoce los costos de uso de tu vehículo y planea tus gastos."
                  : "Know your vehicle's running costs and plan for your expenses."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
            <FaOilCan size={35} className="text-blue-500" />
            <div>
              <div className="text-center font-bold text-gray-800">
                {language === "esp"
                  ? "Recordatorios de Mantenimiento"
                  : "Service reminders"}
              </div>
              <div className="text-sm text-gray-600">
                {language === "esp"
                  ? "No pierdas de vista el mantenimiento y los servicios de tu auto."
                  : "Don’t lose sight of your maintenance and services."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
            <LuMilestone size={35} className="text-blue-500" />
            <div>
              <div className="text-center font-bold text-gray-800">
                {language === "esp"
                  ? "Guarda tu kilometraje"
                  : "Mileage recording"}
              </div>
              <div className="text-sm text-gray-600">
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
