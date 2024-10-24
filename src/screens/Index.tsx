import { IoCarSport } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdAttachMoney } from "react-icons/md";
import { FaOilCan } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { MdOutlineHistory } from "react-icons/md";

export default function Index() {
  return (
    <div className="relative">
      <header className="sticky top-0 flex items-center justify-between bg-blue-950 px-8 py-3">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} /> Drive Check
        </div>
        <div className="text-lg font-bold uppercase">Maintenence tracker</div>
        <div className="flex items-center gap-2 rounded-lg border border-white bg-white p-1 px-3 text-blue-950 transition hover:cursor-pointer hover:bg-transparent hover:text-white">
          <FcGoogle size={25} /> Sign In With Google
        </div>
      </header>
      <main className="flex flex-1 flex-col bg-slate-200 p-8 text-blue-950">
        <div className="flex items-center justify-around">
          <div className="text-xl font-bold text-blue-950">
            <div className="text-2xl">Drive Check always helps your car</div>
            <ul className="flex flex-col gap-3 pt-4">
              <li className="flex items-center gap-4">
                <LuMilestone size={35} /> Mileage Tracking
              </li>
              <li className="flex items-center gap-4">
                <FaOilCan size={32} /> Service reminders
              </li>
              <li className="flex items-center gap-4">
                <MdOutlineHistory size={32} />
                Repair's history
              </li>
            </ul>
          </div>
          <img
            src="../../assets/car1_transp-01.png"
            alt="car"
            className="w-1/2"
          />
        </div>
        <div className="text-center text-xl font-bold text-blue-950">
          APP FEATURES
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <MdAttachMoney size={35} />
            <div>
              <div className="text-center font-bold">Control your expenses</div>
              <div>
                Know your vehicle's running costs and plan for your expenses.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <FaOilCan size={35} />
            <div>
              <div className="text-center font-bold">Service reminders</div>
              <div>Don’t lose sight of your maintenance and services.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-400 p-2">
            <LuMilestone size={35} />
            <div>
              <div className="text-center font-bold">Mileage recording</div>
              <div>Keep your mileage always tracked easily</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
