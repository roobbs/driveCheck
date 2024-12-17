import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import formatDate from "../../utils/formatDate";

export default function Reminder(props: Reminder) {
  const { date, description, mileage } = props;
  const { language } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded-lg border border-gray-500 bg-gray-800 p-4 shadow-md 900p:p-2 680p:gap-1">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex justify-center">
          <MdNotificationsNone size={30} className="text-yellow-300" />
        </div>
        <div className="text-lg font-bold text-blue-100">{description}</div>
        <div> </div>
      </div>

      <div className="text-md flex w-full flex-wrap justify-around gap-1 tracking-wider text-gray-400">
        <div>
          {language === "esp" ? "Realizarse el " : "Scheduled for "}
          <span className="text-xl font-semibold text-blue-400">
            {formatDate(date, language)}
          </span>
        </div>
        <div>
          {language === "esp" ? "o al llegar a " : "or at "}
          <span className="text-xl font-semibold text-blue-400">
            {mileage} km
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
