import { MdOutlineMedicalServices } from "react-icons/md";
import type { MaintenanceRecord } from "../../utils/Interfaces";

export default function MaintenanceRecord(props: MaintenanceRecord) {
  const { date, description, cost, mileage } = props;

  return (
    <>
      <div className="flex items-center gap-4 rounded border border-white p-2">
        <MdOutlineMedicalServices size={25} className="text-yellow-300" />
        <div className="text-lg font-bold">{description}</div>
        <div>{date}</div>
        <div>{mileage}</div>
        <div>{cost}</div>
      </div>
    </>
  );
}
