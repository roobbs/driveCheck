import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import IndexTitle from "./IndexTitle";
import reminderImg from "../../images/reminders.png";
import overviewImg from "../../images/overviewItem.png";
import maintenanceImg from "../../images/maintenanceHistory.png";

export default function FeaturesSection() {
  const { language } = useContext(AuthContext);

  const features = [
    {
      img: reminderImg,
      title:
        language === "esp"
          ? "Recordatorios Personalizados"
          : "Personalized Reminders",
      description:
        language === "esp"
          ? "Nunca olvides el mantenimiento de tu auto con notificaciones a tiempo."
          : "Never forget your car maintenance with timely notifications.",
    },
    {
      img: overviewImg,
      title: language === "esp" ? "Resumen de tu vehiculo" : "Vehicle Overview",
      description:
        language === "esp"
          ? "Realiza una revisión periodica de tu auto."
          : "Perform a periodic review of your car.",
    },
    {
      img: maintenanceImg,
      title:
        language === "esp"
          ? "Historial de Mantenimiento"
          : "Maintenance History",
      description:
        language === "esp"
          ? "Accede al historial completo de reparaciones y servicios realizados."
          : "Access the full history of repairs and services performed.",
    },
  ];

  return (
    <section>
      <IndexTitle
        title={
          language === "esp" ? "Explora las Funciones" : "Explore the Features"
        }
      />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex w-[46%] flex-col items-center justify-between rounded-lg border border-gray-200 bg-gray-900 p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl 900p:w-full"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="mb-4 w-full rounded-lg object-cover"
            />
            <h3 className="mb-2 text-xl font-bold text-yellow-300 1000p:text-lg">
              {feature.title}
            </h3>
            <p className="text-center italic text-gray-100 580p:text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
