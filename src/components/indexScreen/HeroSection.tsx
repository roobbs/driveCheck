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
          <h1 className="rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-6 py-4 text-center text-4xl text-white shadow-lg shadow-blue-900 md:px-8 md:py-6 md:text-5xl 490p:text-2xl">
            {language === "esp"
              ? "Organiza el mantenimiento y control de tus gastos automotrices"
              : "Organize maintenance and control your automotive expenses"}
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
