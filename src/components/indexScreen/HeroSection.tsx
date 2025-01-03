import { useContext } from "react";
import carImage from "../../images/car1_transp-01.webp";
import { AuthContext } from "../auth/AuthContext";
import SignInButton from "../auth/SignInButton";

export default function HeroSection() {
  const { language } = useContext(AuthContext);

  return (
    <>
      <section className="grid grid-cols-5 flex-col items-center 750p:flex">
        <div className="col-span-3 flex flex-col items-center gap-6 text-xl 490p:text-lg">
          <h1 className="bg-gradient-to-r from-indigo-900 via-blue-950 to-cyan-800 bg-clip-text text-center text-5xl font-bold text-transparent md:text-5xl 490p:text-2xl">
            {language === "esp" ? (
              <>
                Organiza el mantenimiento <br />
                <span className="bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent">
                  y controla tus gastos automotrices
                </span>
              </>
            ) : (
              <>
                Organize maintenance <br />
                <span className="bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  and control your automotive expenses
                </span>
              </>
            )}
          </h1>

          <p className="text-lg font-bold text-gray-700 490p:text-base">
            {language === "esp"
              ? "Optimiza el cuidado de tu auto con seguimiento de kilometraje, recordatorios de mantenimiento y mucho más."
              : "Optimize your car care with mileage tracking, maintenance reminders, and more."}
          </p>
          <div className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 shadow-lg 750p:hidden">
            <h3 className="mb-4 text-center text-xl font-bold text-white">
              {language === "esp"
                ? "¿Listo para empezar?"
                : "Ready to get started?"}
            </h3>
            <SignInButton />
          </div>
        </div>
        <img src={carImage} alt="mainCarImage" className="col-span-2" />
        <div className="hidden w-4/5 flex-col items-center rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 shadow-lg 750p:flex 390p:w-full">
          <h3 className="mb-4 text-center text-xl font-bold text-white">
            {language === "esp"
              ? "¿Listo para empezar?"
              : "Ready to get started?"}
          </h3>
          <SignInButton />
        </div>
      </section>
    </>
  );
}
