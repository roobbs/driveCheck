import { FaCarBattery } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { RiTempColdFill } from "react-icons/ri";

export default function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Overview</div>
      <section className="grid grid-cols-2 justify-around gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        <div className="flex items-center gap-4">
          <div className="text-blue-400">Oil level</div>
          <div className="text-lg font-bold">90%</div>
          <FaOilCan size={25} className="text-yellow-300" />
          <div>23-ago-24</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-blue-400">Battery Voltage</div>
          <div className="text-lg font-bold">12.8 v</div>
          <FaCarBattery size={19} className="text-yellow-300" />
          <div>23-ago-24</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-blue-400">Tire pressure</div>
          <div className="text-lg font-bold">35 psi</div>
          <GiCarWheel size={22} className="text-yellow-300" />
          <div>23-ago-24</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-blue-400">Coolant Level</div>
          <div className="text-lg font-bold">100%</div>
          <RiTempColdFill size={25} className="text-yellow-300" />
          <div>23-ago-24</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-blue-400">Steering Wheel Level</div>
          <div className="text-lg font-bold">100%</div>
          <RiTempColdFill size={25} className="text-yellow-300" />
          <div>23-ago-24</div>
        </div>
      </section>
    </div>
  );
}
