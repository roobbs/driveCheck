import type { OverviewEntry } from "../../utils/Interfaces";
import { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { CiEdit } from "react-icons/ci";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

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
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{language === "esp" ? nameEs : name}</div>
      {name.includes("Battery") || name.includes("Tire") ? (
        isEditing ? (
          <input
            type="number"
            min={1}
            max={40}
            onChange={(e) => setEditedLEvel(e.target.value)}
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
          value={editedDate}
          onChange={(e) => setEditedDate(e.target.value)}
          className="rounded border p-1"
        />
      )}

      {isEditing ? (
        <>
          <div
            className="rounded border border-yellow-300"
            onClick={handleSave}
          >
            Guardar
          </div>
          <div
            className="rounded border border-yellow-300"
            onClick={() => setIsEditing(false)}
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
