import CostByMonthChart from "./charts/CostByMonthChart";
import OdometerChart from "./charts/OdometerChart";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import { useFuelStats } from "../hooks/useFuelStats";

export default function Charts() {
  const { language } = useContext(AuthContext);
  const fuelStats = useFuelStats();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-yellow-300">
        {language === "esp"
          ? "Tendencias de Consumo y Uso del Vehículo"
          : "Consumption and Vehicle Usage Trends"}
      </h2>
      {fuelStats ? (
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
      ) : (
        <section className="flex items-center justify-center rounded-xl bg-gray-900 p-4 text-center font-bold">
          {language === "esp"
            ? "No hay datos suficientes para mostrar las gráficas. Registra cada carga de combustible y el uso de tu vehículo regularmente para visualizar las tendencias sobre tu consumo y rendimiento correctamente."
            : "Not enough data to display the charts. Log your fuel entries and vehicle usage consistently to visualize trends about your consumption and performance correctly."}
        </section>
      )}
    </div>
  );
}
