import { MdAttachMoney } from "react-icons/md";
import { FaOilCan } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

export default function BenefitsSection() {
  const { language } = useContext(AuthContext);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">
        {language === "esp"
          ? "Por qué elegir Drive Tracker"
          : "Why Choose Drive Tracker"}
      </h2>
      <div className="flex flex-wrap justify-around gap-8">
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
    </section>
  );
}
