import { useContext } from "react";
import { useFuelStats } from "../../hooks/useFuelStats";
import { AuthContext } from "../auth/AuthContext";

export default function FuelStatsSummary() {
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
      label: language === "esp" ? "🚗Distancia Total" : "🚗Total Distance",
      value: `${totalDistance.toFixed(2)} ${user?.unitOfMeasure}`,
      icon: "🚗",
    },
    {
      label:
        language === "esp"
          ? `💸Costo por ${user?.unitOfMeasure === "km" ? "Km" : "Mi"}`
          : `💸Cost per ${user?.unitOfMeasure === "km" ? "Km" : "Mi"}`,
      value: `$${costPerKm.toFixed(2)}`,
      icon: "💸",
    },
    {
      label: language === "esp" ? "⛽Eficiencia" : "⛽Efficiency",
      value: `${efficiency.toFixed(2)} ${user?.unitOfMeasure}/L`,
      icon: "⛽",
    },
    {
      label: language === "esp" ? "💸Costo p/Litro" : "💸Cost per Liter",
      value: `$${costPerLiter.toFixed(2)}`,
      icon: "💸",
    },
    {
      label:
        language === "esp"
          ? "📏Promedio de Distancia entre Cargas"
          : "📏Avg. Distance Between Fills",
      value: `${avgDistanceBetweenFills.toFixed(2)} ${user?.unitOfMeasure}`,
      icon: "📏",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-yellow-300">
        {language === "esp"
          ? "Datos de Consumo y Rendimiento"
          : "Fuel Data and Performance"}
      </h2>
      {fuelStats ? (
        <section className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-gray-900 p-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center rounded-lg transition-transform hover:scale-105"
            >
              <span className="mt-2 text-sm font-medium text-yellow-100">
                {stat.label}
              </span>
              <hr className="my-2 w-full border-yellow-100" />
              <span className="rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-yellow-900 to-yellow-600 p-3 text-2xl font-semibold text-white shadow-lg transition-all hover:border-yellow-400 hover:shadow-2xl">
                {stat.value}
              </span>
            </div>
          ))}
        </section>
      ) : (
        <section className="flex items-center justify-center rounded-xl bg-gray-900 p-4 text-center font-bold">
          {language === "esp"
            ? "No hay suficientes datos de combustible disponibles. Registra al menos dos cargas de combustible."
            : "Not enough fuel data available. Log at least two fuel entries."}
        </section>
      )}
    </div>
  );
}
