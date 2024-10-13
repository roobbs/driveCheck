import { IoCarSport } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-8 py-3">
      <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
        <IoCarSport size={40} /> Drive Check
      </div>
      <div className="text-lg font-bold uppercase">Maintenence tracker</div>
      <div>
        <IoIosSettings
          size={30}
          className="rounded-full transition-colors hover:bg-white hover:text-blue-600"
        />
      </div>
    </header>
  );
}

export default Header;
