import { FaCirclePlus } from "react-icons/fa6";
import MaintenanceRecord from "./MaintenanceRecord";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

export default function MaintenanceHistory() {
  const { user } = useContext(AuthContext);
  const records = user?.car.maintenanceHistory;
  console.log(records);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Maintenance History</div>
      <section className="relative flex flex-col flex-wrap gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        <div className="">
          <FaCirclePlus size={45} className="text-yellow-300" />
        </div>
        {records?.length === 0 && (
          <div className="text-center text-xl font-bold">
            Add your first maintenance record here
          </div>
        )}
        {records && records?.length > 0 && (
          <>
            {records?.map((rec) => {
              <MaintenanceRecord
                description={rec.description}
                date={rec.date}
                cost={rec.cost}
                mileage={rec.mileage}
              />;
            })}
          </>
        )}
      </section>
    </div>
  );
}
