import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import formatDate from "../../../utils/formatDate";
import formatNumber from "../../../utils/formatNumber";
import { AuthContext } from "../auth/AuthContext";
import { useContext, useState } from "react";
import { FuelRecord } from "../../../utils/Interfaces";
import DeleteFuelModal from "../modals/DeleteFuel";
import EditFuelModal from "../modals/EditFuel";

export default function FuelTable({ data }: { data: FuelRecord[] }) {
  const { language, user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FuelRecord | null>(null);

  return (
    <>
      <table className="w-full border-collapse overflow-hidden rounded-lg shadow-lg shadow-gray-950">
        <thead>
          <tr className="bg-gray-900 text-yellow-300">
            <th className="p-3 text-left">
              {language === "esp" ? "Fecha" : "Date"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Costo" : "Cost"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Cantidad" : "Amount"}
            </th>
            <th className="p-3 text-left">
              {language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilómetros"
                  : "Millas"
                : user?.unitOfMeasure === "km"
                  ? "Kilometers"
                  : "Miles"}
            </th>
            <th className="p-3 text-left">
              {language === "esp" ? "Precio p/L" : "Price per L"}
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={index}
              className={`cursor-pointer border-b border-transparent transition-colors duration-500 hover:border-yellow-300 hover:bg-slate-950 ${
                index % 2 === 0 ? "bg-slate-700" : "bg-slate-800"
              }`}
            >
              <td className="whitespace-nowrap p-3 font-medium text-gray-300">
                {formatDate(record.date, language)}
              </td>
              <td className="p-3 font-medium text-green-500">
                ${formatNumber(record.cost)}
              </td>
              <td className="whitespace-nowrap p-3 text-center font-medium text-blue-400">
                {`${formatNumber(record.fuelAmount)} ${
                  user?.unitOfMeasure === "km" ? "L" : "gal"
                }`}
              </td>
              <td className="whitespace-nowrap p-3 font-medium text-blue-400">
                {`${formatNumber(record.odometer)} ${user?.unitOfMeasure}`}
              </td>
              <td className="whitespace-nowrap p-3 font-medium text-blue-400">
                {`$ ${(record.cost / record.fuelAmount).toFixed(2)}`}
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-yellow-300"
                onClick={() => {
                  setSelectedRecord(record);
                  setShowEdit(true);
                }}
              >
                <MdOutlineEdit />
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-red-400"
                onClick={() => {
                  setSelectedRecord(record);
                  setShowDelete(true);
                }}
              >
                <MdOutlineDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEdit && selectedRecord && (
        <EditFuelModal
          date={selectedRecord.date}
          cost={selectedRecord.cost}
          fuelAmount={selectedRecord.fuelAmount}
          odometer={selectedRecord.odometer}
          closeModal={() => setShowEdit(false)}
        />
      )}
      {showDelete && selectedRecord && (
        <DeleteFuelModal
          date={selectedRecord.date}
          cost={selectedRecord.cost}
          fuelAmount={selectedRecord.fuelAmount}
          odometer={selectedRecord.odometer}
          setShowConfirm={setShowDelete}
        />
      )}
    </>
  );
}
