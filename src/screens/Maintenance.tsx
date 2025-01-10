import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import DeleteMaintenanceModal from "../components/DeleteMaintenance";
import { MaintenanceRecord } from "../../utils/Interfaces";

export default function Maintenance() {
  const { user, language } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<MaintenanceRecord | null>(null);

  const maintenanceHistory = (user?.car?.maintenanceHistory || []).sort(
    (a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    },
  );

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <h1 className="text-xl font-bold text-yellow-300">
        Maintenance History{" "}
        <span className="text-sm text-gray-400">{`(${maintenanceHistory.length} ${language === "esp" ? "registros" : "records"})`}</span>
      </h1>
      <table className="w-full border-collapse overflow-hidden rounded-lg shadow-lg shadow-gray-950">
        <thead>
          <tr className="bg-gray-900 text-yellow-300">
            <th className="p-3 text-left">
              {language === "esp" ? "Fecha" : "Date"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Servicio" : "Service"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Piezas" : "Parts"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Mano de obra" : "Labor cost"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Costo total" : "Total cost"}
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
            <th></th>
            <th></th>
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
              <td className="whitespace-nowrap p-3 text-center font-medium text-blue-400">
                ${formatNumber(record.partCost)}
              </td>
              <td className="whitespace-nowrap p-3 text-center font-medium text-blue-400">
                ${formatNumber(record.laborCost)}
              </td>
              <td className="whitespace-nowrap p-3 text-center font-medium text-green-500">
                ${formatNumber(record.laborCost + record.partCost)}
              </td>
              <td className="whitespace-nowrap p-3 font-medium text-blue-400">
                {`${formatNumber(record.odometer)} ${user?.unitOfMeasure}`}
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-yellow-300"
                onClick={() => {}}
              >
                <MdOutlineEdit />
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-red-400"
                onClick={() => {
                  setShowConfirm(true);
                  setSelectedRecord(record);
                }}
              >
                <MdOutlineDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirm && selectedRecord && (
        <DeleteMaintenanceModal
          date={selectedRecord.date}
          description={selectedRecord.description}
          partCost={selectedRecord.partCost}
          laborCost={selectedRecord.laborCost}
          odometer={selectedRecord.odometer}
          setShowConfirm={setShowConfirm}
        />
      )}
    </main>
  );
}
