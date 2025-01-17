import { useContext, useState } from "react";
import AddRecordModal from "./AddRecordModal";
import AddReminderModal from "./AddReminderModal";
import FuelModal from "./FuelModal";
import { BsFuelPump } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";

export default function Buttons() {
  const [openModal, setOpenModal] = useState<string | null>(null); // "record", "reminder", "fuel", or null
  const { language } = useContext(AuthContext);

  const handleClose = () => setOpenModal(null);

  return (
    <section className="flex flex-wrap items-center justify-center gap-8 bg-gray-800 p-4">
      <button
        onClick={() => setOpenModal("fuel")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-11/12"
      >
        <BsFuelPump size={22} />
        {language === "esp" ? "Carga de combustible" : "Fuel recharge"}
      </button>

      <button
        onClick={() => setOpenModal("reminder")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-11/12"
      >
        <IoMdNotifications size={22} />
        {language === "esp" ? "Agregar recordartorio" : "New Reminder"}
      </button>

      <button
        onClick={() => setOpenModal("record")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-11/12"
      >
        <AiFillTool size={22} />
        {language === "esp"
          ? "Nuevo registro de mantenimiento"
          : "New Maintenance Record"}
      </button>

      {openModal === "record" && <AddRecordModal closeModal={handleClose} />}
      {openModal === "reminder" && (
        <AddReminderModal closeModal={handleClose} />
      )}
      {openModal === "fuel" && <FuelModal closeModal={handleClose} />}
    </section>
  );
}
