import { useState, useContext } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { CiEdit } from "react-icons/ci";
import type { Summary } from "../../utils/Interfaces";
import EditableField from "./EditableField";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../styles/animations.css";
import formatNumber from "../../utils/formatNumber";

export default function Summary() {
  const { language, user, updateUser } = useContext(AuthContext);

  const [model, setModel] = useState(user?.car.summary.model);
  const [year, setYear] = useState(user?.car.summary.year);
  const [odometer, setOdometer] = useState(user?.car.summary.odometer);
  const [brand, setBrand] = useState(user?.car.summary.brand);

  const [open, setOpen] = useState(model && year ? false : true);
  const [editing, setEditing] = useState(false);

  const openTitle = language === "esp" ? "Información" : "Vehicle Summary";
  const title =
    user?.car.summary.model && user.car.summary.year
      ? `${user?.car.summary.model} ${user?.car.summary.year}`
      : openTitle;

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
        odometer: odometer || 0,
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
    <section className="flex flex-col gap-0">
      <div
        className={`flex justify-around rounded-t-xl bg-gray-900 p-3 ${open ? "rounded-b-none" : "borderRounded rounded-b-xl"}`}
      >
        <div className="font-bold text-yellow-300">
          {open ? openTitle : title}
        </div>
        <div
          role="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="text-yellow-300 transition hover:text-white"
        >
          {open ? (
            <IoIosArrowDropup size={25} />
          ) : (
            <IoIosArrowDropdown size={25} />
          )}
        </div>
      </div>
      <div
        className={`flex-wrap items-center justify-center gap-4 rounded-b-xl bg-gray-900 p-3 ${open ? "expand" : "vanish hidden"}`}
      >
        <div className="flex flex-wrap items-center justify-around gap-6">
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
            label={
              language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilómetros"
                  : "Millas"
                : user?.unitOfMeasure === "km"
                  ? "Kilometers"
                  : "Miles"
            }
            value={odometer || ""}
            current={
              user
                ? `${formatNumber(user.car.summary.odometer)} ${user.unitOfMeasure}`
                : ""
            }
            isEditing={editing}
            onChange={(e) => setOdometer(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <IoCheckmarkCircleOutline
                size={40}
                onClick={saveData}
                className="text-blue-500 transition-transform hover:scale-110 hover:text-yellow-400 active:scale-95"
              />
              <IoMdCloseCircleOutline
                size={40}
                onClick={() => setEditing(false)}
                className="text-red-700 transition-transform hover:scale-110 hover:text-red-500 active:scale-95"
              />
            </>
          ) : (
            <CiEdit
              size={30}
              onClick={() => setEditing(true)}
              className="rounded-lg border border-yellow-300 text-yellow-300 transition-transform hover:scale-105 hover:border-blue-500 hover:text-blue-400 active:scale-95"
            />
          )}
        </div>
      </div>
    </section>
  );
}
