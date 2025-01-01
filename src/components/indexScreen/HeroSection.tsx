import { useContext } from "react";
import carImage from "../../images/car1_transp-01.webp";
import { AuthContext } from "../auth/AuthContext";
import SignInButton from "../auth/SignInButton";

export default function HeroSection() {
  const { language } = useContext(AuthContext);

  return (
    <>
      <section className="grid grid-cols-2 items-center">
        <div className="flex flex-col items-center gap-6 text-xl 490p:text-lg">
          <h1 className="rounded-xl bg-blue-100 px-4 py-2 text-center text-3xl text-blue-900 shadow-md 490p:text-xl">
            {language === "esp"
              ? "Organiza el mantenimiento y control de tus gastos automotrices"
              : "Organize maintenance and control your automotive expenses"}
          </h1>
          <p className="text-lg font-bold text-gray-700 490p:text-base">
            {language === "esp"
              ? "Optimiza el cuidado de tu auto con seguimiento de kilometraje, recordatorios de mantenimiento y mucho más."
              : "Optimize your car care with mileage tracking, maintenance reminders, and more."}
          </p>
          <div className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 p-6 shadow-lg">
            <h3 className="mb-4 text-center text-xl font-bold text-white">
              {language === "esp"
                ? "¿Listo para empezar?"
                : "Ready to get started?"}
            </h3>
            <SignInButton />
          </div>
        </div>
        <img
          src={carImage}
          alt="mainCarImage"
          className=""
          // 750p:w-3/4 680p:w-11/12
        />
      </section>
    </>
  );
}
