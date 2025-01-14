import { useContext, useState } from "react";
import FuelModal from "./FuelModal";
import { AuthContext } from "./auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";

export default function FuelTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        <div className="font-bold text-yellow-300">
          {language === "esp" ? "Seguimiento de Combustible" : "Fuel Tracker"}
        </div>
        <div onClick={() => setIsModalOpen(true)}>
          <FaCirclePlus
            size={45}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

      <section className="grid grid-cols-2 justify-around gap-6 rounded-xl bg-gray-900 p-4 py-6 680p:grid-cols-1">
        hola
      </section>

      {isModalOpen && <FuelModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
