import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

export default function Summary() {
  const [open, setOpen] = useState(true);

  return (
    <section className="rounded-xl bg-gray-900 p-3 py-6">
      <div className="flex justify-around">
        <div className="font-bold text-yellow-300">Vehicle Summary</div>
        <div
          onClick={() => setOpen(!open)}
          className="transition hover:text-yellow-300"
        >
          {!open && <IoIosArrowDropdown size={25} />}
          {open && <IoIosArrowDropup size={25} />}
        </div>
      </div>
      {open && (
        <div className="flex justify-around gap-8">
          <div>
            <div className="text-blue-400">Model</div>
            <div className="text-xl font-bold"> Ford Ranger</div>
          </div>
          <div>
            <div className="text-blue-400">Year</div>
            <div className="text-xl font-bold">1995</div>
          </div>
          <div>
            <div className="text-blue-400">Mileage</div>
            <div className="text-xl font-bold">221,750</div>
          </div>
          <div>
            <div className="text-blue-400">Last Service</div>
            <div className="text-xl font-bold">23 ago 2024</div>
          </div>
        </div>
      )}
    </section>
  );
}
