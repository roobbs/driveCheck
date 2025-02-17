import { NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiToolsFill } from "react-icons/ri";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import useReminders from "../../hooks/useReminders";

export default function NavMenu() {
  const { language } = useContext(AuthContext);
  const { totalUrgentReminders } = useReminders();

  return (
    <nav className="sticky top-0 z-[1] flex items-center justify-around bg-slate-950 px-4 py-2 shadow-md">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex items-center gap-1 rounded px-4 py-1 text-sm font-medium transition duration-300 ${
            isActive
              ? "text-blue-500"
              : "text-slate-300 hover:bg-slate-700 hover:text-white"
          }`
        }
      >
        <MdHomeFilled size={18} />{" "}
        <span className="750p:hidden">
          {language === "esp" ? "Inicio" : "Home"}
        </span>
      </NavLink>
      <NavLink
        to="/reminders"
        className={({ isActive }) =>
          `relative flex items-center gap-1 rounded px-4 py-1 text-sm font-medium transition duration-300 ${
            isActive
              ? "text-blue-500"
              : "text-slate-300 hover:bg-slate-700 hover:text-white"
          } `
        }
      >
        <IoMdNotifications size={20} />{" "}
        <span className="750p:hidden">
          {language === "esp" ? "Recordatorios" : "Reminders"}
        </span>
        {totalUrgentReminders ? (
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 font-bold text-white">
            {totalUrgentReminders}
          </span>
        ) : null}
      </NavLink>
      <NavLink
        to="/fuelRecords"
        className={({ isActive }) =>
          `flex items-center gap-1 rounded px-4 py-1 text-sm font-medium transition duration-300 ${
            isActive
              ? "text-blue-500"
              : "text-slate-300 hover:bg-slate-700 hover:text-white"
          } `
        }
      >
        <BsFillFuelPumpFill size={18} />{" "}
        <span className="750p:hidden">
          {language === "esp" ? "Registros de combustible" : "Fuel records"}
        </span>
      </NavLink>
      <NavLink
        to="/maintenance"
        className={({ isActive }) =>
          `flex items-center gap-1 rounded px-4 py-1 text-sm font-medium transition duration-300 ${
            isActive
              ? "text-blue-500"
              : "text-slate-300 hover:bg-slate-700 hover:text-white"
          } `
        }
      >
        <RiToolsFill size={21} />{" "}
        <span className="750p:hidden">
          {language === "esp"
            ? "Historial de Mantenimiento"
            : "Maintenance History"}
        </span>
      </NavLink>
    </nav>
  );
}
