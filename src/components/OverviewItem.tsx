import type { OverviewEntry } from "../../utils/Interfaces";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { CiEdit } from "react-icons/ci";

export default function OverviewItem(props: PropsWithChildren<OverviewEntry>) {
  const { language, user, updateUser } = useContext(AuthContext);
  const { name, nameEs, level, date, children } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState(date);

  const data = language === "esp" ? "Sin registro" : "No Data";
  const checked = language === "esp" ? "Sin revisar" : "No checked";

  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
  };

  const handleSave = () => {
    if (!user) return;

    const updatedOverview = user.car.overview.map((entry) =>
      entry.name === name ? { ...entry, date: editedDate } : entry,
    );

    updateUser({
      car: {
        ...user.car,
        overview: updatedOverview,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{language === "esp" ? nameEs : name}</div>
      {name.includes("Battery") || name.includes("Tire") ? (
        isEditing ? (
          <input
            type="number"
            // value={10}
            // onChange={handleDateChange}
            className="w-16 rounded border p-1 text-center"
          />
        ) : (
          <div className="text-lg italic">{level || data}</div>
        )
      ) : null}
      {children}
      {!isEditing ? (
        <div className="font-bold">{date ? date : checked}</div>
      ) : (
        <input
          type="date"
          value={new Date().toJSON().slice(0, 10)}
          onChange={handleDateChange}
          className="rounded border p-1"
        />
      )}

      {isEditing ? (
        <>
          <div
            className="rounded border border-yellow-300"
            onClick={() => setIsEditing(!isEditing)}
          >
            Guardar
          </div>
          <div
            className="rounded border border-yellow-300"
            onClick={() => setIsEditing(!isEditing)}
          >
            cancel
          </div>
        </>
      ) : (
        <div
          className="rounded border border-yellow-300"
          onClick={() => setIsEditing(!isEditing)}
        >
          <CiEdit className="text-yellow-300 hover:scale-125" size={20} />
        </div>
      )}
    </div>
  );
}
