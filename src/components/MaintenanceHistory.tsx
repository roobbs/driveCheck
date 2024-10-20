import { MdOutlineMedicalServices } from "react-icons/md";
// import { FaCirclePlus } from "react-icons/fa6";

export default function MaintenanceHistory() {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Maintenance History</div>
      <section className="relative flex flex-col flex-wrap gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        <div className="flex items-center gap-4 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="text-lg font-bold">Oil Change</div>
          <div>23-ago-24</div>
          <div> 223,444 mi</div>
          <div>$ 500</div>
        </div>

        <div className="flex items-center gap-4 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="text-lg font-bold">Battery replacement</div>
          <div>23-ago-24</div>
          <div> 223,444 mi</div>
          <div>$ 500</div>
        </div>

        <div className="flex items-center gap-4 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="text-lg font-bold">Voltage regulator</div>
          <div>23-ago-24</div>
          <div> 223,444 mi</div>
          <div>$ 500</div>
        </div>

        {/* <div style={{ top: 30, right: 30 }} className="absolute ">
          <FaCirclePlus size={45} className="text-yellow-300" />
        </div> */}
      </section>
    </div>
  );
}
