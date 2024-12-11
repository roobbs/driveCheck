import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";

export default function Reminder(props: Reminder) {
  const { date, description, mileage } = props;

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-500 bg-gray-800 p-4 shadow-md">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex justify-center">
          <MdNotificationsNone size={30} className="text-yellow-300" />
        </div>
        <div className="text-lg font-bold text-blue-100">{description}</div>
        <div> </div>
      </div>

      <div className="text-md flex flex-wrap justify-center gap-2 tracking-wider text-gray-400">
        <div>
          Due at{" "}
          <span className="font-semibold text-blue-400">{mileage} km</span>{" "}
        </div>
        <div>
          or on <span className="font-semibold text-blue-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
