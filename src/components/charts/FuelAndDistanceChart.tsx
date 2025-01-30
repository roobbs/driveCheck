import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import formatNumber from "../../../utils/formatNumber";
import { useFuelStats } from "../../hooks/useFuelStats";

export default function FuelAndDistanceChart() {
  const { language } = useContext(AuthContext);
  const fuelStats = useFuelStats();

  if (!fuelStats) {
    return null;
  }

  // Transformar fuelByMonthArr y distanceByMonthArr en un solo array de objetos
  const combinedData = fuelStats.fuelByMonthArr.map(([month, fuel], index) => ({
    month,
    fuel,
    distance: fuelStats.distanceByMonthArr[index]?.[1] || 0,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <BarChart data={combinedData}>
        <CartesianGrid strokeDasharray="6" stroke="#4B5563" />

        <XAxis
          dataKey="month"
          label={{
            value: language === "esp" ? "Mes" : "Month",
            position: "insideBottom",
            offset: -5,
            fill: "#FDE047",
            fontSize: 14,
          }}
          stroke="#FEF9C3"
          tick={{ fill: "#FEF9C3", fontSize: 12 }}
        />

        <YAxis
          yAxisId="left"
          label={{
            value: language === "esp" ? "Combustible (L)" : "Fuel (L)",
            angle: -90,
            position: "outsideLeft",
            dx: -20,
            fill: "#FDE047",
            fontSize: 14,
          }}
          stroke="#3B82F6"
          tick={{ fill: "#FEF9C3", fontSize: 12 }}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: language === "esp" ? "Distancia (km)" : "Distance (km)",
            angle: -90,
            position: "outsideRight",
            dx: 20,
            fill: "#FDE047",
            fontSize: 14,
          }}
          stroke="#FACC15"
          tick={{ fill: "#FEF9C3", fontSize: 12 }}
        />

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { month, fuel, distance } = payload[0].payload;
              return (
                <div className="flex flex-col items-center rounded border border-blue-500 bg-gray-800 p-3 shadow-lg">
                  <p className="text-sm text-white">
                    <strong className="text-blue-400">
                      {language === "esp" ? "Mes:" : "Month:"}
                    </strong>{" "}
                    {month}
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-blue-400">
                      {language === "esp" ? "Combustible:" : "Fuel:"}
                    </strong>{" "}
                    {formatNumber(fuel)} L
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-yellow-400">
                      {language === "esp" ? "Distancia:" : "Distance:"}
                    </strong>{" "}
                    {formatNumber(distance)} km
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend
          content={({ payload }) => (
            <div className="flex w-fit gap-4 rounded-lg border border-blue-500 bg-gray-950 p-2">
              {payload?.map((entry, index) => (
                <div key={`item-${index}`} className="flex items-center gap-1">
                  <svg width="14" height="14">
                    <rect width="14" height="14" fill={entry.color} />
                  </svg>
                  <span
                    style={{
                      color:
                        entry.dataKey === "distance" ? "#FDE047" : "#3B82F6",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.value === "fuel"
                      ? language === "esp"
                        ? "Combustible"
                        : "Fuel"
                      : language === "esp"
                        ? "Distancia"
                        : "Distance"}
                  </span>
                </div>
              ))}
            </div>
          )}
        />

        <defs>
          <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="distanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#FACC15" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Bar
          yAxisId="left"
          dataKey="fuel"
          name={language === "esp" ? "Combustible" : "Fuel"}
          fill="url(#fuelGradient)"
          stroke="#3182bd"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />

        <Bar
          yAxisId="right"
          dataKey="distance"
          name={language === "esp" ? "Distancia" : "Distance"}
          fill="url(#distanceGradient)"
          stroke="#EAB308"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
