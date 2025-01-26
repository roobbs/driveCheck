import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import formatNumber from "../../../utils/formatNumber";
import formatDate from "../../../utils/formatDate";

export default function OdometerChart() {
  const { user, language } = useContext(AuthContext);
  const lastFourData = user?.car.fuelRecords.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <AreaChart data={lastFourData}>
        <CartesianGrid strokeDasharray="6" stroke="#4B5563" />

        <XAxis
          dataKey="date"
          label={{
            value: language === "esp" ? "Fecha" : "Date",
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
            value:
              language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilómetraje:"
                  : "Millas:"
                : "Mileage",
            angle: -90,
            position: "outsideLeft",
            dx: -20,
            fill: "#FDE047",
            fontSize: 14,
          }}
          stroke="#FEF9C3"
          tick={{ fill: "#FEF9C3", fontSize: 12 }}
          domain={["dataMin - 50", "dataMax + 50"]}
        />

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { date, odometer, fuelAmount } = payload[0].payload;
              return (
                <div className="flex flex-col items-center rounded border border-blue-500 bg-gray-800 p-3 shadow-lg">
                  <p className="text-sm text-white">
                    <strong className="text-blue-400">
                      {language === "esp" ? "Fecha:" : "Date:"}
                    </strong>{" "}
                    {formatDate(date, language)}
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-blue-400">
                      {language === "esp"
                        ? user?.unitOfMeasure === "km"
                          ? "Kilómetros:"
                          : "Millas:"
                        : user?.unitOfMeasure === "km"
                          ? "Kilometers:"
                          : "Miles:"}
                    </strong>{" "}
                    {`${formatNumber(odometer)} ${user?.unitOfMeasure}`}
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-blue-400">
                      {language === "esp" ? "Cantidad:" : "Amount:"}
                    </strong>{" "}
                    {fuelAmount} L
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
            width: 120,
            backgroundColor: "#020617",
            fontWeight: "bold",
          }}
        />

        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="60%" stopColor="#3B82F6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="odometer"
          name={language === "esp" ? "Odómetro" : "Odometer"}
          stroke="#3182bd"
          fill="url(#areaGradient)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
