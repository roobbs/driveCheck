import { IoCarSport } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-800 px-8 py-3">
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} /> Drive Check
        </div>
        <div className="text-lg font-bold uppercase">Maintenence tracker</div>
      </div>
      <div>
        <GiHamburgerMenu
          size={30}
          className="transition-colors hover:text-yellow-300"
        />
      </div>
    </header>
  );
}

export default Header;
