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
        className="flex items-center gap-1 rounded bg-yellow-300 px-4 py-2 font-bold text-blue-950 shadow transition hover:bg-yellow-400"
      >
        <BsFuelPump size={22} />
        Add Fuel Record
      </button>

      <button
        onClick={() => setOpenModal("reminder")}
        className="flex items-center gap-1 rounded bg-yellow-300 px-4 py-2 font-bold text-blue-950 shadow transition hover:bg-yellow-400"
      >
        <IoMdNotifications size={22} />
        Add Reminder
      </button>

      <button
        onClick={() => setOpenModal("record")}
        className="flex items-center gap-1 rounded bg-yellow-300 px-4 py-2 font-bold text-blue-950 shadow transition hover:bg-yellow-400"
      >
        <AiFillTool size={22} /> Add Maintenance Record
      </button>

      {openModal === "record" && <AddRecordModal closeModal={handleClose} />}
      {openModal === "reminder" && (
        <AddReminderModal closeModal={handleClose} />
      )}
      {openModal === "fuel" && <FuelModal closeModal={handleClose} />}
    </section>
  );
}
