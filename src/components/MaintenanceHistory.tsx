import { FaCirclePlus } from "react-icons/fa6";
import MaintenanceRecord from "./MaintenanceRecord";
import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import AddRecordModal from "./AddRecordModal";

export default function MaintenanceHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, language } = useContext(AuthContext);
  const records = user?.car.maintenanceHistory;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        <div className="font-bold text-yellow-300">
          {language === "esp"
            ? "Historial de Mantenimiento"
            : "Maintenance History"}
        </div>
        <div className="" onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={45}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>
      <section className="grid grid-cols-1 justify-center gap-4 rounded-xl bg-gray-900 p-4 py-6">
        {records?.length === 0 && (
          <div className="text-center text-xl font-bold">
            {language === "esp"
              ? "Agrega un registro de mantenimiento"
              : "Add a maintenance record"}
          </div>
        )}
        {records && records.length > 0 && (
          <>
            {records?.map((rec, index) => (
              <MaintenanceRecord
                key={index}
                description={rec.description}
                date={rec.date}
                cost={rec.cost}
                odometer={rec.odometer}
              />
            ))}
          </>
        )}

        {modalOpen && <AddRecordModal closeModal={() => setModalOpen(false)} />}
      </section>
    </div>
  );
}
