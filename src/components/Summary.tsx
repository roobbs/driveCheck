import { useState, useContext } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";
// import { db } from "../../config/firebase";

export default function Summary() {
  const { language } = useContext(AuthContext);

  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);

  // Estado para cada campo editable
  const [model, setModel] = useState("Ford Ranger");
  const [year, setYear] = useState("1995");
  const [mileage, setMileage] = useState("221,750");
  const [lastService, setLastService] = useState("23 ago 2024");

  const saveData = async () => {
    try {
      // await db.collection("vehicles").doc("yourVehicleId").set({
      //   model,
      //   year,
      //   mileage,
      //   lastService,
      // });
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
          {language === "esp" ? "Información" : "Vehicle Summary"}
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
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-400">
              {language === "esp" ? "Modelo" : "Model"}
            </span>
            {editing ? (
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="rounded px-2 text-xl font-bold text-gray-800"
              />
            ) : (
              <div className="text-xl font-bold">{model}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-400">
              {language === "esp" ? "Año" : "Year"}
            </span>
            {editing ? (
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded px-2 text-xl font-bold text-gray-800"
              />
            ) : (
              <div className="text-xl font-bold">{year}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-400">
              {language === "esp" ? "Kilometraje" : "Mileage"}
            </span>
            {editing ? (
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="rounded px-2 text-xl font-bold text-gray-800"
              />
            ) : (
              <div className="text-xl font-bold">{mileage}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-400">
              {language === "esp" ? "Último Servicio" : "Last Service"}
            </span>
            {editing ? (
              <input
                type="text"
                value={lastService}
                onChange={(e) => setLastService(e.target.value)}
                className="rounded px-2 text-xl font-bold text-gray-800"
              />
            ) : (
              <div className="text-xl font-bold">{lastService}</div>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {editing ? (
              <button
                onClick={saveData}
                className="rounded bg-yellow-500 px-4 py-2 text-white"
              >
                {language === "esp" ? "Guardar" : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                {language === "esp" ? "Editar" : "Edit"}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
