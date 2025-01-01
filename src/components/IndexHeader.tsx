import enImage from "../images/en_US.png";
import esImage from "../images/es_MX.png";
import { IoCarSport } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import SignInButton from "./auth/SignInButton";

export default function IndexHeader() {
  const { language, changeLanguage } = useContext(AuthContext);

  return (
    <header className="sticky top-0 flex items-center justify-between gap-4 bg-gradient-to-r from-blue-950 to-blue-600 px-8 py-3">
      <div className="flex items-center gap-2 1000p:flex-col-reverse">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-2 font-bold text-blue-800 transition-colors hover:border-white hover:bg-transparent hover:text-white">
          <IoCarSport size={40} />{" "}
          <span className="490p:hidden">Drive Tracker</span>
        </div>
        <div className="text-lg font-bold uppercase 580p:hidden">
          {language === "esp"
            ? "Control de mantenimiento"
            : "Maintenance tracker"}
        </div>
      </div>
      <div className="flex items-center gap-8 750p:gap-4 680p:flex-col-reverse 680p:gap-3">
        <SignInButton />
        <div className="flex cursor-pointer overflow-hidden rounded border border-blue-950">
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
    </header>
  );
}
