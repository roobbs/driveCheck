import { useContext } from "react";
import { useFuelStats } from "../hooks/useFuelStats";
import { AuthContext } from "./auth/AuthContext";

export default function FuelStats() {
  const fuelStats = useFuelStats();
  const { user, language } = useContext(AuthContext);

  const {
    totalDistance = 0,
    costPerKm = 0,
    efficiency = 0,
    costPerLiter = 0,
    avgDistanceBetweenFills = 0,
  } = fuelStats || {};

  const stats = [
    {
      label:
        language === "esp"
          ? `Costo por ${user?.unitOfMeasure === "km" ? "Km" : "Mi"}:`
          : `Cost per ${user?.unitOfMeasure === "km" ? "Km" : "Mi"}:`,
      value: `$${costPerKm.toFixed(2)}`,
    },
    {
      label: language === "esp" ? "Eficiencia:" : "Efficiency:",
      value: `${efficiency.toFixed(2)} ${user?.unitOfMeasure}/L`,
    },
    {
      label: language === "esp" ? "Costo p/Litro:" : "Cost per Liter:",
      value: `$${costPerLiter.toFixed(2)}`,
    },
    {
      label:
        language === "esp"
          ? "Distancia Prom. entre Cargas:"
          : "Avg. Distance Between Fills:",
      value: `${avgDistanceBetweenFills.toFixed(2)} ${user?.unitOfMeasure}`,
    },
  ];

  return (
    <section className="rounded-lg shadow-sm">
      <div className="mb-2 text-[13px] text-yellow-200">
        {language === "esp" ? "Distancia total:" : "Total Distance"}{" "}
        <span className="font-bold text-yellow-300">
          {totalDistance.toFixed(2)} {user?.unitOfMeasure}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="825p:flex-col 825p:gap-0 flex items-center gap-2 text-xs shadow-sm"
          >
            <span className="text-[13px] text-blue-200">{stat.label}</span>
            <span className="rounded bg-blue-200 px-1 text-lg font-semibold text-blue-900">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
