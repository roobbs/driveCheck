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
import { useMaintenanceInfo } from "../../hooks/useMaintenanceInfo";
import formatNumber from "../../../utils/formatNumber";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

export default function MaintenanceByYear() {
  const { maintenanceByYear } = useMaintenanceInfo();
  const { language } = useContext(AuthContext);

  const maintenanceData = Object.entries(maintenanceByYear).map(
    ([year, cost]) => ({
      year,
      cost,
    }),
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={maintenanceData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />

        <XAxis
          dataKey="year"
          label={{
            value: "Año",
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
            value: "Costo (MXN)",
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
              const { year, cost } = payload[0].payload;
              return (
                <div className="flex flex-col items-center rounded border border-yellow-500 bg-gray-800 p-3 shadow-lg">
                  <p className="text-sm text-white">
                    <strong className="text-yellow-400">Año:</strong> {year}
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-yellow-400">Costo:</strong> $
                    {formatNumber(cost)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend
          wrapperStyle={{
            // border: "1px solid #3182bd",
            // borderRadius: "8px",
            // padding: "5px",
            // backgroundColor: "#020617",
            // color: "#3182bd",
            // fontWeight: "bold",
            border: "1px solid #3182bd",
            borderRadius: "8px",
            padding: "5px",
            width: 152,
            backgroundColor: "#020617",
            color: "#3182bd",
            fontWeight: "bold",
          }}
        />

        {/* Degradado para la barra */}
        <defs>
          <linearGradient id="maintenanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <Bar
          dataKey="cost"
          name={language === "esp" ? "Gasto total" : "Total expenses"}
          fill="url(#maintenanceGradient)"
          stroke="#3182bd"
          strokeWidth={2}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
