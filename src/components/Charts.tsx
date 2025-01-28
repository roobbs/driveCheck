import CostByMonthChart from "./charts/CostByMonthChart";
import OdometerChart from "./charts/OdometerChart";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

export default function Charts() {
  const { language } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-yellow-300">
        {language === "esp" ? "Estadísticas de Combustible" : "Fuel Statistics"}
      </h2>
      <section className="flex flex-col gap-4 rounded-xl bg-gray-900 p-1">
        <div className="flex flex-col items-center gap-2">
          <h3 className="m-2 border-b border-yellow-200 p-2 text-center text-xl font-semibold text-yellow-300">
            {language === "esp" ? "Costo por Mes" : "Cost by Month"}
          </h3>
          <CostByMonthChart />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="m-2 border-b border-yellow-200 p-2 text-center text-xl font-semibold text-yellow-300">
            {language === "esp" ? "Lectura del Odómetro" : "Odometer Reading"}
          </h3>
          <OdometerChart />
        </div>
      </section>
    </div>
  );
}
