import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import formatDate from "../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";

export default function Reminder(props: Reminder) {
  const { date, description, odometer } = props;
  const { language, user } = useContext(AuthContext);

  const isSoon = () => {
    const reminderDate = new Date(date).getTime();
    const today = new Date().getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return reminderDate - today <= oneWeek;
  };

  const borderColor = isSoon() ? "border-red-500" : "border-gray-500";
  const dateColor = isSoon() ? "text-red-500" : "text-blue-400";

  return (
    <div
      className={`flex flex-col items-center justify-between gap-2 rounded-lg border ${borderColor} bg-gray-800 p-4 shadow-md 900p:p-2 680p:gap-1`}
    >
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
          <span className={`text-xl font-semibold ${dateColor}`}>
            {formatDate(date, language)}
          </span>
        </div>
        <div>
          {language === "esp" ? "o al llegar a " : "or at "}
          <span className={`text-xl font-semibold ${dateColor}`}>
            {formatNumber(odometer ? odometer : 0)} {user?.unitOfMeasure}
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
