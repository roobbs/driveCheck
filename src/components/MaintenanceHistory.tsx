import { FaCirclePlus } from "react-icons/fa6";
import MaintenanceRecord from "./MaintenanceRecord";
import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import AddRecordModal from "./AddRecordModal";

export default function MaintenanceHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const records = user?.car.maintenanceHistory;

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Maintenance History</div>
      <section className="flex flex-col flex-wrap gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        {records?.length === 0 && (
          <div className="text-center text-xl font-bold">
            Add your first maintenance record here
          </div>
        )}
        <div className="flex items-center gap-6">
          {records && records.length > 0 && (
            <>
              {records?.map((rec, index) => (
                <MaintenanceRecord
                  key={index}
                  description={rec.description}
                  date={rec.date}
                  cost={rec.cost}
                  mileage={rec.mileage}
                />
              ))}
            </>
          )}
          <div className="" onClick={() => setModalOpen(true)}>
            <FaCirclePlus
              size={45}
              className="text-yellow-300 hover:text-yellow-400"
            />
          </div>
        </div>
        {modalOpen && <AddRecordModal closeModal={() => setModalOpen(false)} />}
      </section>
    </div>
  );
}
