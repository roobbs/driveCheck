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
    <ResponsiveContainer width={"100%"} height={180}>
      <BarChart
        data={costByMonthData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 6" stroke="#475569" />
        <XAxis
          dataKey="month"
          label={{
            value: language === "esp" ? "Mes" : "Month",
            position: "insideBottom",
            offset: -5,
            fill: "white",
          }}
          stroke="#0ea5e9"
          strokeWidth={2}
          tick={{ fill: "#0ea5e9" }}
        />
        <YAxis
          label={{
            value: language === "esp" ? "Costo" : "Cost",
            angle: -90,
            position: "outsideLeft",
            dx: -30,
            fill: "white",
          }}
          strokeWidth={2}
          stroke="#0ea5e9"
          tick={{ fill: "#0ea5e9" }}
          // domain={["dataMin - 5", "dataMax + 5"]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { month, cost } = payload[0].payload;
              return (
                <div className="flex flex-col items-center rounded border border-yellow-300 bg-slate-900 p-2">
                  <p>
                    <strong className="text-yellow-300">
                      {language === "esp" ? "Mes:" : "Month:"}
                    </strong>{" "}
                    {month}
                  </p>
                  <p>
                    <strong className="text-yellow-300">
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
            width: "20%",
            // top: 20,
            // right: 10,
            backgroundColor: "#facc15",
            border: "1px solid #facc15",
            borderRadius: 5,
          }}
        />
        <Bar
          dataKey="cost"
          name={language === "esp" ? "Costo" : "Cost"}
          fill="#1F2937"
          radius={[4, 4, 4, 4]}
          stroke="#facc15"
          strokeWidth={2}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
