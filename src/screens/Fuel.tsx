import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";
import FuelModal from "../components/FuelModal";
import FuelTable from "../components/FuelTable";
// import EditFuelRecordModal from "../components/EditFuelRecordModal";
// import DeleteFuelRecordModal from "../components/DeleteFuelRecordModal";
// import { FuelRecord } from "../../utils/Interfaces";

export default function Fuel() {
  const { user, language } = useContext(AuthContext);
  // const [showDelete, setShowDelete] = useState(false);
  // const [showEdit, setShowEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // const [selectedRecord, setSelectedRecord] = useState<FuelRecord | null>(null);

  const fuelRecords = (user?.car?.fuelRecords || []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-300">
          {language === "esp" ? "Historial de Combustible" : "Fuel History"}{" "}
          <p className="text-sm text-gray-400">{`(${user?.car.fuelRecords.length} ${language === "esp" ? "registros" : "records"})`}</p>
        </h1>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={50}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

      <FuelTable data={fuelRecords} />

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
