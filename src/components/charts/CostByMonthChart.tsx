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

export default function CostByMonthChart() {
  const { language } = useContext(AuthContext);
  const fuelStats = useFuelStats();

  if (!fuelStats) {
    return null;
  }

  // Transformar costByMonthArr a un array de objetos
  const costByMonthData = fuelStats.costByMonthArr.map(([month, cost]) => ({
    month,
    cost,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <BarChart data={costByMonthData}>
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
          label={{
            value: language === "esp" ? "Costo" : "Cost",
            angle: -90,
            position: "outsideLeft",
            dx: -20,
            fill: "#FDE047",
            fontSize: 14,
          }}
          stroke="#FEF9C3"
          tick={{ fill: "#FEF9C3", fontSize: 12 }}
        />

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { month, cost } = payload[0].payload;
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
                      {language === "esp" ? "Costo:" : "Cost:"}
                    </strong>{" "}
                    ${formatNumber(cost)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend
          wrapperStyle={{
            border: "1px solid #3182bd",
            borderRadius: "8px",
            padding: "5px",
            width: 100,
            backgroundColor: "#020617",
            color: "#3182bd",
            fontWeight: "bold",
          }}
        />

        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Bar
          dataKey="cost"
          name={language === "esp" ? "Costo" : "Cost"}
          fill="url(#barGradient)"
          stroke="#3182bd"
          strokeWidth={2}
          // background={{ fill: "#020617" }}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
