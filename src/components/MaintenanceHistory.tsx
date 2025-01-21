import MaintenanceRecord from "./MaintenanceRecord";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Link } from "react-router-dom";
import { RiToolsFill } from "react-icons/ri";

export default function MaintenanceHistory() {
  const { user, language } = useContext(AuthContext);
  const records = user?.car.maintenanceHistory
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-12">
        <div className="font-bold text-yellow-300">
          {language === "esp" ? "Últimos servicios" : "Last services"}
        </div>

        <Link
          to={"/maintenance"}
          className="flex items-center gap-1 rounded-lg border border-blue-500 bg-blue-700 p-2 text-sm font-semibold transition hover:bg-blue-800"
        >
          <RiToolsFill size={21} />
          {language === "esp" ? "Ver historial completo" : "View full history"}
        </Link>
      </div>
      <section className="grid grid-cols-1 justify-center gap-4 rounded-xl bg-gray-900 p-4 py-6">
        {records?.length === 0 && (
          <div className="text-center text-xl font-bold">
            {language === "esp"
              ? "Agrega un registro de mantenimiento"
              : "Add a maintenance record"}
          </div>
        )}
        {records && records.length > 0 && (
          <>
            {records?.map((rec, index) => (
              <MaintenanceRecord
                key={index}
                description={rec.description}
                date={rec.date}
                laborCost={rec.laborCost}
                partCost={rec.partCost}
                odometer={rec.odometer}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
