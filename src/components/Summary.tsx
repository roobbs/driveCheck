import { useState, useContext } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { CiEdit } from "react-icons/ci";
import type { Summary } from "../../utils/Interfaces";

export default function Summary() {
  const { language, user, updateUser } = useContext(AuthContext);

  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);

  const [model, setModel] = useState(user?.car.summary.model);
  const [year, setYear] = useState(user?.car.summary.year);
  const [mileage, setMileage] = useState(user?.car.summary.mileage);
  const [lastService, setLastService] = useState(
    user?.car.summary.lastServiceDate,
  );

  const saveData = async () => {
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

      const updatedSummary: Summary = {
        model: model || "",
        year: year || 0,
        mileage: mileage || 0,
        lastServiceDate: lastService || "",
      };

      await updateDoc(userDocRef, {
        "car.summary": updatedSummary,
      });

      updateUser({
        car: {
          ...user.car,
          summary: updatedSummary,
        },
      });

      setEditing(false);
      alert(language === "esp" ? "Datos guardados" : "Data saved");
    } catch (error) {
      console.error("Error al guardar en Firebase: ", error);
      alert(language === "esp" ? "Error al guardar" : "Save error");
    }
  };

  return (
    <section className="rounded-xl bg-gray-900 p-3 py-6">
      <div className="flex justify-around">
        <div className="font-bold text-yellow-300">
          {`${user?.car.summary.model}` || language === "esp"
            ? "Información"
            : "Vehicle Summary"}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="transition hover:text-yellow-300"
        >
          {!open && <IoIosArrowDropdown size={25} />}
          {open && <IoIosArrowDropup size={25} />}
        </div>
      </div>
      {open && (
        <div className="mt-5 flex flex-col">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-400">
                {language === "esp" ? "Modelo" : "Model"}
              </span>
              {editing ? (
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="rounded px-2 py-1 text-xl font-bold"
                />
              ) : (
                <div className="text-xl font-bold">
                  {user?.car.summary.model ||
                    (language === "esp" ? "No registrado" : "No record")}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-400">
                {language === "esp" ? "Año" : "Year"}
              </span>
              {editing ? (
                <input
                  type="number"
                  max={2025}
                  min={1980}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="rounded px-2 py-1 text-xl font-bold"
                />
              ) : (
                <div className="text-xl font-bold">
                  {user?.car.summary.year ||
                    (language === "esp" ? "No registrado" : "No record")}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-400">
                {language === "esp" ? "Kilometraje" : "Mileage"}
              </span>
              {editing ? (
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="rounded px-2 py-1 text-xl font-bold"
                />
              ) : (
                <div className="text-xl font-bold">
                  {user?.car.summary.mileage ||
                    (language === "esp" ? "No registrado" : "No record")}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-400">
                {language === "esp" ? "Último Servicio" : "Last Service"}
              </span>
              {editing ? (
                <input
                  type="date"
                  value={lastService}
                  onChange={(e) => setLastService(e.target.value)}
                  className="rounded px-2 text-xl font-bold"
                />
              ) : (
                <div className="text-xl font-bold">
                  {user?.car.summary.lastServiceDate ||
                    (language === "esp" ? "No registrado" : "No record")}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {editing ? (
              <>
                <button
                  onClick={saveData}
                  className="rounded bg-yellow-500 px-4 py-2 font-bold text-white"
                >
                  {language === "esp" ? "Guardar" : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded bg-red-600 px-4 py-2 font-bold text-white"
                >
                  {language === "esp" ? "Cancelar" : "Cancel"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white"
              >
                <CiEdit size={25} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
