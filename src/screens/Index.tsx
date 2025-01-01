import { MdAttachMoney, MdOutlineHistory } from "react-icons/md";
import { FaOilCan } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import carImage from "../images/car1_transp-01.webp";
import IndexHeader from "../components/IndexHeader";

export default function Index() {
  const { language } = useContext(AuthContext);

  const remindersImage = "";
  const maintenanceTableImage = "";

  return (
    <>
      <IndexHeader />
      <main className="flex flex-1 flex-col bg-slate-50 p-8 text-gray-800 390p:p-4">
        <div className="flex flex-wrap items-center justify-around">
          <div className="text-xl font-bold 490p:text-lg">
            <div className="rounded-xl bg-blue-100 px-4 py-2 text-center text-2xl text-blue-600 shadow-md 490p:text-xl">
              {language === "esp"
                ? "Drive Tracker te ayuda con tu auto"
                : "Drive Tracker always helps your car"}
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
            src={carImage}
            alt="mainCarImage"
            className="w-2/5 750p:w-3/4 680p:w-11/12"
          />
        </div>

        <div className="mt-12 border-b-2 border-blue-300 py-1 text-center text-2xl font-bold text-blue-600">
          {language === "esp" ? "Características de la App" : "App Features"}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-lg 390p:p-1">
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

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={remindersImage}
              alt="Reminders Preview"
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center text-gray-700">
              {language === "esp"
                ? "Recordatorios personalizados para el mantenimiento de tu auto."
                : "Custom reminders for your car’s maintenance."}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={maintenanceTableImage}
              alt="Maintenance Table"
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center text-gray-700">
              {language === "esp"
                ? "Historial de mantenimiento detallado y organizado."
                : "Detailed and organized maintenance history."}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
