import { MdOutlineMedicalServices } from "react-icons/md";
import type { MaintenanceRecord } from "../../utils/Interfaces";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

export default function MaintenanceRecord(props: MaintenanceRecord) {
  const { date, description, cost, mileage } = props;
  const { language } = useContext(AuthContext);

  return (
    <div className="maintenanceContainer grid w-[900px] grid-cols-2 items-center gap-6 justify-self-center rounded border border-gray-500 bg-gray-800 p-4 shadow-md 1280p:w-[70%] 1180p:w-[80%] 900p:w-[100%] 650p:grid-cols-1 650p:gap-1">
      <div className="flex items-center gap-4">
        <MdOutlineMedicalServices size={35} className="text-yellow-300" />
        <div className="text-lg font-bold text-blue-100">{description}</div>
      </div>

      <div className="flex flex-wrap justify-around gap-6 text-center 390p:gap-2">
        <div>
          <div className="text-sm font-bold text-gray-400">
            {language === "esp" ? "Fecha" : "Date"}
          </div>
          <div className="font-semibold text-blue-400">{date}</div>
        </div>

        <div>
          <div className="text-sm font-bold text-gray-400">
            {language === "esp" ? "Kilometraje" : "Mileage"}
          </div>
          <div className="font-semibold text-blue-400">{mileage} km</div>
        </div>

        <div>
          <div className="text-sm font-bold text-gray-400">
            {language === "esp" ? "Costo" : "Cost"}
          </div>
          <div className="font-semibold text-blue-400">${cost}</div>
        </div>
      </div>
    </div>
  );
}
