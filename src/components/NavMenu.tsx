import { NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiToolsFill } from "react-icons/ri";

export default function NavMenu() {
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
        <MdHomeFilled size={18} /> <span className="750p:hidden">Home</span>
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
        <span className="750p:hidden">Reminders</span>
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
        <span className="750p:hidden">Maintenance History</span>
      </NavLink>
    </nav>
  );
}
