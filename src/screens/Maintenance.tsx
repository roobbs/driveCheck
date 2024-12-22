import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";

export default function Maintenance() {
  const { user, language } = useContext(AuthContext);
  const maintenanceHistory = (user?.car?.maintenanceHistory || []).sort(
    (a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    },
  );

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <h1 className="sticky left-1 text-xl font-bold text-yellow-300">
        Maintenance History
      </h1>
      <table className="relative w-full border-collapse overflow-hidden rounded-lg shadow-lg shadow-gray-950">
        <thead>
          <tr className="sticky top-0 bg-gray-900 text-yellow-300">
            <th className="p-3 text-left">
              {language === "esp" ? "Fecha" : "Date"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Servicio" : "Service"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Costo" : "Cost"}
            </th>
            <th className="p-3 text-left">
              {language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilometros"
                  : "Millas"
                : user?.unitOfMeasure === "km"
                  ? "Lilometers"
                  : "Miles"}
            </th>
          </tr>
        </thead>
        <tbody>
          {maintenanceHistory.map((record, index) => (
            <tr
              key={index}
              className={`cursor-pointer border-b border-transparent transition-colors duration-500 hover:border-yellow-300 hover:bg-slate-950 ${
                index % 2 === 0 ? "bg-slate-700" : "bg-slate-800"
              }`}
            >
              <td className="whitespace-nowrap p-3 font-medium text-gray-300">
                {formatDate(record.date, language)}
              </td>
              <td className="p-3 font-medium text-blue-100">
                {record.description}
              </td>
              <td className="whitespace-nowrap p-3 font-medium text-green-500">
                ${formatNumber(record.cost)}
              </td>
              <td className="whitespace-nowrap p-3 font-medium text-blue-400">
                {`${formatNumber(record.odometer)} ${user?.unitOfMeasure}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
