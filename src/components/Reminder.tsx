import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";

export default function Reminder(props: Reminder) {
  const { date, description, mileage } = props;

  return (
    <div className="flex items-center gap-4 rounded border border-gray-500 bg-gray-800 p-4 shadow-md">
      {/* Icono */}
      <div className="flex items-center justify-center">
        <MdNotificationsNone size={35} className="text-yellow-300" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-white">{description}</div>

        <div className="text-md text-gray-400">
          Due at{" "}
          <span className="font-semibold text-blue-400">{mileage} km</span> or
          on <span className="font-semibold text-blue-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
