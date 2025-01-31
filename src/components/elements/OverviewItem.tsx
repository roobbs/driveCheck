import type { OverviewEntry } from "../../../utils/Interfaces";
import { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { CiEdit } from "react-icons/ci";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import dateFormat from "../../../utils/formatDate";
import getDays from "../../../utils/getDays";

export default function OverviewItem(props: PropsWithChildren<OverviewEntry>) {
  const { language, user, updateUser } = useContext(AuthContext);
  const { name, nameEs, level, date, children } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState(
    date || new Date().toJSON().slice(0, 10),
  );
  const [editedLevel, setEditedLEvel] = useState(level);

  const data = language === "esp" ? "Sin registro" : "No Data";
  const checked = language === "esp" ? "Sin revisar" : "No checked";

  const daysFromChecked = date ? getDays(date) : null;

  let borderColor = "border-gray-500";
  let textColor = "text-blue-400";
  if (daysFromChecked !== null) {
    if (daysFromChecked <= -21) {
      borderColor = "border-red-500";
      textColor = "text-red-500";
    } else if (daysFromChecked <= -14) {
      borderColor = "border-yellow-500";
      textColor = "text-yellow-500";
    }
  }
  if (isEditing) {
    borderColor = "border-blue-400";
  }

  const handleSave = async () => {
    try {
      if (!user?.uid) {
        alert(
          language === "esp"
            ? "Usuario no autenticado"
            : "User not authenticated",
        );
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const updatedOverview = user.car.overview.map((entry) =>
        entry.name === name
          ? { ...entry, date: editedDate, level: editedLevel }
          : entry,
      );

      await updateDoc(userDocRef, { "car.overview": updatedOverview });

      updateUser({
        car: {
          ...user.car,
          overview: updatedOverview,
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col ${borderColor} gap-2 rounded-lg border px-4 py-2 ${
        isEditing ? "bg-slate-800" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        {children && !isEditing && <div>{children}</div>}

        <div className="text-lg font-bold text-blue-100">
          {language === "esp" ? nameEs : name}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <IoCheckmarkCircleOutline
                size={25}
                onClick={handleSave}
                className="cursor-pointer text-blue-500 hover:text-yellow-300"
              />
              <IoMdCloseCircleOutline
                size={25}
                onClick={() => setIsEditing(false)}
                className="cursor-pointer text-red-700 hover:text-red-500"
              />
            </>
          ) : (
            <CiEdit
              size={20}
              onClick={() => setIsEditing(true)}
              className="cursor-pointer text-yellow-300 hover:scale-125"
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-around gap-4">
        <div className="flex items-baseline gap-2">
          <div className="text-sm text-gray-400">
            {language === "esp" ? "Revisado el:" : "Checked on:"}
          </div>
          {isEditing ? (
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-32 rounded border border-gray-600 bg-gray-900 p-1 text-blue-400"
            />
          ) : (
            <div className={`font-semibold ${textColor}`}>
              {date ? dateFormat(date, language) : checked}
            </div>
          )}
        </div>

        {(name.includes("Battery") || name.includes("Tire")) && (
          <div className="flex items-baseline gap-2">
            <div className="text-sm text-gray-400">
              {language === "esp" ? "Nivel:" : "Level:"}
            </div>
            {isEditing ? (
              <input
                type="number"
                min={1}
                max={40}
                value={editedLevel}
                onChange={(e) => setEditedLEvel(e.target.value)}
                className="w-16 rounded border border-gray-600 bg-gray-900 p-1 text-center text-blue-400"
              />
            ) : (
              <div className={`text-lg font-semibold ${textColor}`}>
                {level || data}{" "}
                <span className="text-sm text-gray-400">
                  {level && name.includes("Tire") ? "psi" : null}
                  {level && name.includes("Battery") ? "v" : null}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
