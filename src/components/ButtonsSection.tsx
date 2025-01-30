import { useContext, useState } from "react";
import AddRecordModal from "./AddRecordModal";
import AddReminderModal from "./AddReminderModal";
import FuelModal from "./FuelModal";
import { BsFuelPump } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { AuthContext } from "./auth/AuthContext";
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function Buttons() {
  const [openModal, setOpenModal] = useState<string | null>(null); // "record", "reminder", "fuel", or null
  const { language } = useContext(AuthContext);

  const handleClose = () => setOpenModal(null);

  const buttonsSize = 45;

  const buttons = [
    {
      id: "fuel",
      icon: <BsFuelPump size={buttonsSize} />,
      tooltip:
        language === "esp"
          ? "Registra una carga de combustible"
          : "Log your fuel charge",
    },
    {
      id: "reminder",
      icon: <IoMdNotifications size={buttonsSize} />,
      text: language === "esp" ? "Agregar Recordatorio" : "New Reminder",
      tooltip:
        language === "esp"
          ? "Crea un recordatorio importante"
          : "Set an important reminder",
    },
    {
      id: "record",
      icon: <AiFillTool size={buttonsSize} />,
      ext: language === "esp" ? "Nuevo Mantenimiento" : "Maintenance Record",
      tooltip:
        language === "esp"
          ? "Registra un nuevo mantenimiento"
          : "Add a maintenance record",
    },
  ];

  return (
    <section className="backdrop-blur-xs sticky bottom-0 flex items-center justify-center gap-8 bg-gradient-to-b from-slate-800/5 to-slate-800/80 py-2 390p:gap-4">
      {buttons.map((button) => (
        <div
          key={button.id}
          className="group relative flex flex-col items-center justify-center rounded-lg border border-blue-400 bg-gradient-to-b from-blue-600 to-blue-950 p-3 text-white transition-transform hover:scale-105 hover:from-blue-700 hover:to-blue-900 active:scale-95"
          onClick={() => setOpenModal(button.id)}
        >
          <BsFillPlusCircleFill className="absolute -right-2 -top-2 h-6 w-6 rounded-full border-2 border-yellow-400 bg-yellow-300 font-bold text-slate-900" />
          {button.icon}
          {/* Tooltip */}
          <div className="absolute bottom-full hidden rounded-lg border bg-blue-950 px-3 py-2 text-center text-sm text-white group-hover:block">
            {button.tooltip}
          </div>
        </div>
      ))}

      {openModal === "record" && <AddRecordModal closeModal={handleClose} />}
      {openModal === "reminder" && (
        <AddReminderModal closeModal={handleClose} />
      )}
      {openModal === "fuel" && <FuelModal closeModal={handleClose} />}
    </section>
  );
}
