import { IoCarSport } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { signUserOut } from "../../utils/database";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

function Header() {
  const [menu, setMenu] = useState(false);
  const { user, deleteUserFromContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = async () => {
    await signUserOut();
    deleteUserFromContext();
    navigate("/");
  };

  return (
    <header className="relative flex items-center justify-between bg-blue-800 px-8 py-3">
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} /> Drive Check
        </div>
        <div className="text-lg font-bold uppercase">Maintenence tracker</div>
      </div>
      <div onClick={() => setMenu(!menu)}>
        <GiHamburgerMenu
          size={32}
          className="transition-colors hover:text-yellow-300"
        />
      </div>
      {menu && (
        <div className="absolute right-4 top-full flex w-1/3 flex-col gap-2 bg-white p-2 text-blue-800">
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL}
              alt="user"
              className="h-12 rounded-full"
            />
            <div className="text-lg">{user?.displayName}</div>
          </div>
          <div className="flex items-center justify-around">
            <div className="text-md font-bold">Language</div>
            <div className="flex cursor-pointer rounded border border-blue-950">
              <div className="bg-blue-800 px-1 text-white hover:bg-blue-950">
                Esp
              </div>
              <div className="bg-slate-800 px-1 text-white hover:bg-blue-950">
                Eng
              </div>
            </div>
          </div>
          <div
            onClick={logOut}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-blue-800 text-center font-bold text-white transition hover:bg-blue-950"
          >
            <MdLogout size={25} /> Log Out
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
