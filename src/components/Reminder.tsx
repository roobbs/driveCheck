import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";

export default function Reminder(props: Reminder) {
  const { date, description, mileage } = props;

  return (
    <div className="flex items-center gap-3 rounded border border-white p-2">
      <MdNotificationsNone size={25} className="text-yellow-300" />
      <div className="flex flex-col items-center gap-1">
        <div className="text-lg font-bold">{description}</div>
        <div>
          <div className="font-bold italic text-blue-400">
            Due in {mileage} | {date}
          </div>
        </div>
      </div>
    </div>
  );
}
