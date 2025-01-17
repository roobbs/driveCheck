import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../utils/Interfaces";
import { AuthContext } from "./auth/AuthContext";
import { useContext, useState } from "react";
import formatDate from "../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";
import getDays from "../../utils/getDays";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import DeleteReminderModal from "./DeleteReminder";
import EditReminderModal from "./EditReminder";

export default function Reminder(props: Reminder) {
  const { date, description, odometer } = props;
  const { language, user } = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const daysUntilReminder = getDays(date);

  let borderColor = "border-gray-500";
  let textColor = "text-blue-400";

  if (daysUntilReminder <= 7) {
    borderColor = "border-red-700";
    textColor = "text-red-400";
  } else if (daysUntilReminder <= 14) {
    borderColor = "border-yellow-500";
    textColor = "text-yellow-400";
  }

  return (
    <div
      className={`flex flex-col justify-between gap-2 rounded-lg border ${borderColor} bg-gray-800 p-4 shadow-md 900p:p-2 680p:gap-1`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <MdNotificationsNone size={25} className="text-yellow-300" />
        <div className={`text-lg font-bold ${textColor}`}>{description}</div>
        <MdOutlineEdit
          size={22}
          className="text-yellow-300 transition hover:scale-125"
          onClick={() => setShowEdit(true)}
        />
      </div>

      <div className="text-md flex w-full flex-wrap justify-around gap-1 tracking-wider text-gray-400">
        <div>
          {language === "esp" ? "Realizarse el " : "Scheduled for "}
          <span className={`text-xl font-semibold ${textColor}`}>
            {formatDate(date, language)}
          </span>
        </div>
        <div>
          {language === "esp" ? "o al llegar a " : "or at "}
          <span className={`text-xl font-semibold ${textColor}`}>
            {formatNumber(odometer ? odometer : 0)} {user?.unitOfMeasure}
          </span>{" "}
        </div>
      </div>
      {daysUntilReminder <= 14 ? (
        <div
          className="flex justify-center text-yellow-400 transition duration-300 hover:scale-110 hover:text-blue-400"
          onClick={() => setShowDelete(true)}
        >
          <MdFileDownloadDone size={25} />
        </div>
      ) : (
        <div
          className="flex justify-center text-red-500 transition duration-300 hover:scale-110 hover:text-red-600"
          onClick={() => setShowDelete(true)}
        >
          <MdOutlineDelete size={22} />
        </div>
      )}

      {showDelete && (
        <DeleteReminderModal
          date={date}
          description={description}
          odometer={odometer}
          setShowConfirm={setShowDelete}
          daysUntilReminder={daysUntilReminder}
        />
      )}

      {showEdit && (
        <EditReminderModal
          date={date}
          description={description}
          odometer={odometer ? odometer : 0}
          closeModal={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}
