import { useFuelStats } from "../hooks/useFuelStats";

export default function FuelStatsSummary() {
  const fuelStats = useFuelStats();

  if (!fuelStats) {
    return (
      <section className="text-center text-gray-500">
        No fuel data available. Add some records to see your stats.
      </section>
    );
  }

  const {
    totalDistance,
    costPerKm,
    efficiency,
    costPerLiter,
    avgDistanceBetweenFills,
  } = fuelStats;

  const stats = [
    {
      label: "Total Distance",
      value: `${totalDistance.toFixed(2)} km`,
      icon: "🚗",
    },
    { label: "Cost per Km", value: `$${costPerKm.toFixed(2)}`, icon: "💸" },
    { label: "Efficiency", value: `${efficiency.toFixed(2)} km/L`, icon: "⚙️" },
    {
      label: "Cost per Liter",
      value: `$${costPerLiter.toFixed(2)}`,
      icon: "⛽",
    },
    {
      label: "Avg Distance Between Fills",
      value: `${avgDistanceBetweenFills.toFixed(2)} km`,
      icon: "📏",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-yellow-300">Fuel Stats Summary</h2>
      <section className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-gray-900 p-4 490p:gap-4 440p:gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center rounded-lg border border-transparent bg-gradient-to-br from-slate-800 to-gray-800 px-6 py-1 shadow-lg transition-transform hover:scale-105 hover:border-blue-300 hover:from-slate-700 hover:to-slate-800"
          >
            <span className="mt-2 text-sm font-medium text-blue-200">
              {stat.label}
            </span>
            <hr className="my-2 w-full border-gray-200" />
            <span className="text-2xl font-bold text-yellow-300">
              {stat.value}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
