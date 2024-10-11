import { IoCarSport } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-8 py-1">
      <div className="flex items-center gap-2 font-bold">
        <IoCarSport size={40} /> Drive Check
      </div>
      <div className="text-lg font-bold uppercase">Maintenence tracker</div>
      <IoIosSettings size={30} />
    </header>
  );
}

export default Header;
