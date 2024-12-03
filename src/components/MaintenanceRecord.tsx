import { MdOutlineMedicalServices } from "react-icons/md";
import type { MaintenanceRecord } from "../../utils/Interfaces";

export default function MaintenanceRecord(props: MaintenanceRecord) {
  const { date, description, cost, mileage } = props;

  return (
    <div className="flex flex-col gap-2 rounded border border-white bg-slate-900 p-4">
      <div className="flex items-center gap-4">
        <MdOutlineMedicalServices size={25} className="text-yellow-300" />
        <div className="text-xl font-bold">{description}</div>
      </div>
      <div className="mt-2 flex gap-6">
        <div>
          <div className="text-sm font-bold text-gray-400">Date</div>
          <div className="font-bold">{date}</div>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-400">Mileage</div>
          <div className="font-bold">{mileage} km</div>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-400">Cost</div>
          <div className="font-bold">${cost}</div>
        </div>
      </div>
    </div>
  );
}
