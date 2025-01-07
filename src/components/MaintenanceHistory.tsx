import { FaCirclePlus } from "react-icons/fa6";
import MaintenanceRecord from "./MaintenanceRecord";
import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import AddRecordModal from "./AddRecordModal";
import { Link } from "react-router-dom";

export default function MaintenanceHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, language } = useContext(AuthContext);
  const records = user?.car.maintenanceHistory
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        <div className="font-bold text-yellow-300">
          {language === "esp" ? "Últimos servicios" : "Last services"}
        </div>
        <div className="" onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={45}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
        <Link
          to={"/maintenance"}
          className="self-end text-sm text-blue-500 underline transition hover:text-yellow-400"
        >
          {language === "esp" ? "Ver historial completo" : "View full history"}
        </Link>
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
                laborCost={rec.laborCost}
                partCost={rec.partCost}
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
