import { NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiToolsFill } from "react-icons/ri";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

export default function NavMenu() {
  const { language } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 flex items-center justify-around bg-slate-950 px-4 py-2 shadow-md">
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
          `flex items-center gap-1 rounded px-4 py-1 text-sm font-medium transition duration-300 ${
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
