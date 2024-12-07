import { useState, useContext } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { CiEdit } from "react-icons/ci";
import type { Summary } from "../../utils/Interfaces";
import EditableField from "./EditableField";

export default function Summary() {
  const { language, user, updateUser } = useContext(AuthContext);

  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);

  const [model, setModel] = useState(user?.car.summary.model);
  const [year, setYear] = useState(user?.car.summary.year);
  const [mileage, setMileage] = useState(user?.car.summary.mileage);
  const [brand, setBrand] = useState(user?.car.summary.brand);

  const title =
    user?.car.summary.model && user.car.summary.year
      ? `${user?.car.summary.model} ${user?.car.summary.year}`
      : false;
  const openTitle = language === "esp" ? "Información" : "Vehicle Summary";

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
        brand: brand || "",
        model: model || "",
        year: year || 0,
        mileage: mileage || 0,
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
          {open && title ? openTitle : title}
        </div>
        <div
          role="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="transition hover:text-yellow-300"
        >
          {open ? (
            <IoIosArrowDropup size={25} />
          ) : (
            <IoIosArrowDropdown size={25} />
          )}
        </div>
      </div>
      {open && (
        <div className="mt-5 flex flex-col">
          <div className="flex flex-wrap justify-around gap-8">
            <EditableField
              label={language === "esp" ? "Marca" : "Brand"}
              value={brand || ""}
              current={user ? user.car.summary.brand : ""}
              isEditing={editing}
              onChange={(e) => setBrand(e.target.value)}
            />
            <EditableField
              label={language === "esp" ? "Modelo" : "Model"}
              value={model || ""}
              current={user ? user.car.summary.model : ""}
              isEditing={editing}
              onChange={(e) => setModel(e.target.value)}
            />
            <EditableField
              label={language === "esp" ? "Año" : "Year"}
              value={year || ""}
              current={user ? user.car.summary.year : ""}
              isEditing={editing}
              onChange={(e) => setYear(Number(e.target.value))}
              type="number"
            />
            <EditableField
              label={language === "esp" ? "Kilometraje" : "Mileage"}
              value={mileage || ""}
              current={user ? user.car.summary.mileage : ""}
              isEditing={editing}
              onChange={(e) => setMileage(Number(e.target.value))}
            />
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
