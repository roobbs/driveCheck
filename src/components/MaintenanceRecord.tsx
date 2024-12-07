import { MdOutlineMedicalServices } from "react-icons/md";
import type { MaintenanceRecord } from "../../utils/Interfaces";

export default function MaintenanceRecord(props: MaintenanceRecord) {
  const { date, description, cost, mileage } = props;

  return (
    <div className="flex flex-col gap-4 rounded border border-gray-500 bg-gray-800 p-4 shadow-md">
      <div className="flex items-center gap-4">
        <MdOutlineMedicalServices size={35} className="text-yellow-300" />
        <div className="text-lg font-bold text-blue-100">{description}</div>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-sm font-bold text-gray-400">Date</div>
          <div className="font-semibold text-blue-400">{date}</div>
        </div>

        <div>
          <div className="text-sm font-bold text-gray-400">Mileage</div>
          <div className="font-semibold text-blue-400">{mileage} km</div>
        </div>

        <div>
          <div className="text-sm font-bold text-gray-400">Cost</div>
          <div className="font-semibold text-blue-400">${cost}</div>
        </div>
      </div>
    </div>
  );
}
