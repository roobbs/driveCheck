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
    <ResponsiveContainer width={"100%"} height={180}>
      <AreaChart
        data={lastFourData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 6" stroke="#475569" />
        <XAxis
          dataKey="date"
          label={{
            value: language === "esp" ? "Fecha" : "Date",
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
            value:
              language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilómetraje:"
                  : "Millas:"
                : "Mileage",
            angle: -90,
            position: "outsideLeft",
            dx: -30,
            fill: "white",
          }}
          stroke="#0ea5e9"
          strokeWidth={2}
          tick={{ fill: "#0ea5e9" }}
          domain={["dataMin - 5", "dataMax + 5"]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { date, odometer, fuelAmount } = payload[0].payload;
              return (
                <div className="flex flex-col items-center rounded border border-yellow-300 bg-slate-900 p-2">
                  <p>
                    <strong className="text-yellow-300">
                      {language === "esp" ? "Fecha:" : "Date:"}
                    </strong>{" "}
                    {formatDate(date, language)}
                  </p>
                  <p>
                    <strong className="text-yellow-300">
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
                  <p>
                    <strong className="text-yellow-300">
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
            width: "30%",
            // top: 0,
            // right: 50,
            backgroundColor: "#1f2937",
            border: "1px solid #facc15",
            borderRadius: 5,
          }}
        />
        <Area
          type="monotone"
          dataKey="odometer"
          name={language === "esp" ? "Odómetro" : "Odometer"}
          stroke="#facc15"
          fill="#374151"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
