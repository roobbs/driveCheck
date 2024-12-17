import { IoCarSport } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { signUserOut } from "../../utils/database";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "../styles/animations.css";
import enImage from "../images/en_US.png";
import esImage from "../images/es_MX.png";
import { FaLanguage } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";

function Header() {
  const [menu, setMenu] = useState(false);
  const { user, deleteUserFromContext, language, changeLanguage } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = async () => {
    await signUserOut();
    deleteUserFromContext();
    navigate("/");
  };

  const changeUnitOfMeasure = (newUnit: string) => {
    if (newUnit === "km") {
      // changeUserInFirebase
    } else if (newUnit === "mi") {
      // changeUserInFirebase
    }
  };

  return (
    <header className="relative flex items-center justify-between bg-blue-950 px-8 py-3">
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} /> Drive Check
        </div>
        <div className="text-lg font-bold uppercase 680p:hidden">
          {language === "esp"
            ? "Control de mantenimiento"
            : "Maintenance tracker"}
        </div>
      </div>
      <div onClick={() => setMenu(!menu)}>
        {menu ? (
          <IoClose
            size={35}
            className="text-red-400 transition-colors hover:text-white"
          />
        ) : (
          <GiHamburgerMenu
            size={32}
            className="transition-colors hover:text-yellow-300"
          />
        )}
      </div>
      <div
        className={`absolute right-4 top-full z-10 w-1/3 flex-col gap-4 bg-white p-2 text-blue-800 transition 900p:w-1/2 650p:right-0 650p:w-full ${menu ? "expand" : "vanish hidden"}`}
      >
        <div className="flex items-center gap-4">
          <img
            src={user?.profilePicture}
            alt="user"
            className="h-11 rounded-full"
          />
          <div className="text-lg">{user?.name}</div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="text-md flex items-center gap-1 font-bold">
            <FaLanguage size={25} />{" "}
            {language === "esp" ? "Idioma" : "Language"}
          </div>
          <div className="flex cursor-pointer rounded border border-blue-950">
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                language === "esp" ? "bg-blue-800 font-bold" : "bg-slate-600"
              }`}
              onClick={() => changeLanguage("esp")}
            >
              Es <img src={esImage} alt="" />
            </div>
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                language === "eng" ? "bg-blue-800 font-bold" : "bg-slate-600"
              }`}
              onClick={() => changeLanguage("eng")}
            >
              En <img src={enImage} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="text-md flex items-center gap-1 font-bold">
            <TbRulerMeasure size={25} />
            {language === "esp" ? "Unidad de medida" : "Unit of measure"}
          </div>
          <div className="flex cursor-pointer rounded border border-blue-950">
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                user?.unitOfMeasure === "km"
                  ? "bg-blue-800 font-bold"
                  : "bg-slate-600"
              }`}
              onClick={() => changeUnitOfMeasure("km")}
            >
              Km
            </div>
            <div
              className={`flex items-center gap-1 px-1 text-white hover:bg-blue-900 ${
                user?.unitOfMeasure === "mi"
                  ? "bg-blue-800 font-bold"
                  : "bg-slate-600"
              }`}
              onClick={() => changeUnitOfMeasure("mi")}
            >
              Mi
            </div>
          </div>
        </div>
        <div
          onClick={logOut}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-blue-900 text-center font-bold text-white transition hover:bg-blue-800 650p:w-1/2 650p:self-center"
        >
          <MdLogout size={25} />{" "}
          {language === "esp" ? "Cerrar Sesión" : "Log Out"}
        </div>
      </div>
    </header>
  );
}

export default Header;
