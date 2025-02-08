import { MdNotificationsNone } from "react-icons/md";
import type { Reminder } from "../../../utils/Interfaces";
import { AuthContext } from "../auth/AuthContext";
import { useContext, useState } from "react";
import formatDate from "../../../utils/formatDate";
import formatNumber from "../../../utils/formatNumber";
import getDays from "../../../utils/getDays";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import DeleteReminderModal from "../modals/DeleteReminder";
import EditReminderModal from "../modals/EditReminder";

export default function Reminder(props: Reminder) {
  const { date, description, odometer } = props;
  const { language, user } = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const daysUntilReminder = getDays(date);

  let borderColor = "border-gray-500";
  let textColor = "text-blue-400";

  if (daysUntilReminder <= 7) {
    borderColor = "border-red-400";
    textColor = "text-red-400";
  } else if (daysUntilReminder <= 14) {
    borderColor = "border-yellow-200";
    textColor = "text-yellow-400";
  }

  return (
    <div
      className={`relative flex min-w-[800px] flex-col justify-between gap-2 rounded-lg border 900p:min-w-full ${borderColor} bg-gray-800 p-4 shadow-md 900p:p-2 680p:gap-1`}
    >
      <div className="relative flex w-full items-center px-7">
        <div className="absolute -left-1 -top-1 rounded p-1">
          <MdNotificationsNone size={25} className="text-blue-300" />
        </div>
        <div
          className={`w-full border-b ${borderColor} px-2 pb-1 text-lg font-bold text-blue-100`}
        >
          {description.toUpperCase()[0] + description.slice(1)}
        </div>
        <div className="absolute -right-1 -top-1 rounded p-1">
          <MdOutlineEdit
            size={22}
            className="text-yellow-300 transition hover:scale-125"
            onClick={() => setShowEdit(true)}
          />
        </div>
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

      {/* Delete or Mark as Done */}
      <div className="flex justify-center">
        {daysUntilReminder <= 14 ? (
          <button
            className="mt-1 flex items-center gap-2 rounded-lg bg-yellow-400/10 px-4 py-1 text-yellow-400 transition hover:scale-105 hover:bg-yellow-400/20"
            onClick={() => setShowDelete(true)}
          >
            <MdFileDownloadDone size={20} />
            <span>
              {language === "esp" ? "Marcar como hecho" : "Mark as done"}
            </span>
          </button>
        ) : (
          <button
            className="mt-1 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-1 text-red-500 transition hover:scale-105 hover:bg-red-500/20"
            onClick={() => setShowDelete(true)}
          >
            <MdOutlineDelete size={20} />
            <span>{language === "esp" ? "Eliminar" : "Delete"}</span>
          </button>
        )}
      </div>

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
