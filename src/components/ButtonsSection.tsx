import { useState } from "react";
import AddRecordModal from "./AddRecordModal";
import AddReminderModal from "./AddReminderModal";
import FuelModal from "./FuelModal";
import { BsFuelPump } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

export default function Buttons() {
  const [openModal, setOpenModal] = useState<string | null>(null); // "record", "reminder", "fuel", or null

  const handleClose = () => setOpenModal(null);

  return (
    <section className="flex flex-wrap items-center justify-center gap-8 bg-gray-800 p-4">
      <button
        onClick={() => setOpenModal("fuel")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-3/4"
      >
        <BsFuelPump size={22} />
        Fuel recharge
      </button>

      <button
        onClick={() => setOpenModal("reminder")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-3/4"
      >
        <IoMdNotifications size={22} />
        New Reminder
      </button>

      <button
        onClick={() => setOpenModal("record")}
        className="flex items-center justify-center gap-1 rounded-lg border border-blue-500 bg-blue-900 px-4 py-2 font-bold shadow transition hover:bg-slate-900 440p:w-3/4"
      >
        <AiFillTool size={22} />
        New Maintenance
      </button>

      {openModal === "record" && <AddRecordModal closeModal={handleClose} />}
      {openModal === "reminder" && (
        <AddReminderModal closeModal={handleClose} />
      )}
      {openModal === "fuel" && <FuelModal closeModal={handleClose} />}
    </section>
  );
}
