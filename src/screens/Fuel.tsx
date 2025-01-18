import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import FuelModal from "../components/FuelModal";
// import EditFuelRecordModal from "../components/EditFuelRecordModal";
// import DeleteFuelRecordModal from "../components/DeleteFuelRecordModal";
// import { FuelRecord } from "../../utils/Interfaces";

export default function Fuel() {
  const { user, language } = useContext(AuthContext);
  // const [showDelete, setShowDelete] = useState(false);
  // const [showEdit, setShowEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // const [selectedRecord, setSelectedRecord] = useState<FuelRecord | null>(null);

  const fuelRecords = (user?.car?.fuelRecords || []).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-300">
          {language === "esp" ? "Historial de Combustible" : "Fuel History"}{" "}
          <p className="text-sm text-gray-400">{`(${fuelRecords.length} ${
            language === "esp" ? "registros" : "records"
          })`}</p>
        </h1>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={50}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

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
          {fuelRecords.map((record, index) => (
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
                {`$ ${record.cost / record.fuelAmount}`}
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-yellow-300"
                onClick={() => {
                  // setSelectedRecord(record);
                  // setShowEdit(true);
                }}
              >
                <MdOutlineEdit />
              </td>
              <td
                className="whitespace-nowrap p-3 font-medium text-red-400"
                onClick={() => {
                  // setSelectedRecord(record);
                  // setShowDelete(true);
                }}
              >
                <MdOutlineDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {showEdit && selectedRecord && (
        <EditFuelRecordModal
          date={selectedRecord.date}
          cost={selectedRecord.cost}
          amount={selectedRecord.fuelAmount}
          odometer={selectedRecord.odometer}
          closeModal={() => setShowEdit(false)}
        />
      )}
      {showDelete && selectedRecord && (
        <DeleteFuelRecordModal
          date={selectedRecord.date}
          cost={selectedRecord.cost}
          amount={selectedRecord.fuelAmount}
          odometer={selectedRecord.odometer}
          setShowConfirm={setShowDelete}
        />
      )} */}
      {modalOpen && <FuelModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
