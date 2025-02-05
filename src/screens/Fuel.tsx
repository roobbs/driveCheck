import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";
import FuelModal from "../components/modals/AddFuelModal";
import FuelTable from "../components/tables/FuelTable";
import { IoMdCloseCircle } from "react-icons/io";
import { TbFilter } from "react-icons/tb";
import FuelStats from "../components/sections/FuelStats";

export default function Fuel() {
  const { user, language } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const maxCostValue = user?.car?.fuelRecords?.length
    ? Math.max(...user.car.fuelRecords.map((record) => record.cost)) + 200
    : 0;

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(maxCostValue);

  const fuelRecords = (user?.car?.fuelRecords || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((record) => {
      //
      const recordDate = new Date(record.date).getTime();
      const startDate = dateRange.start
        ? new Date(dateRange.start).getTime()
        : null;
      const endDate = dateRange.end ? new Date(dateRange.end).getTime() : null;

      if (startDate && recordDate < startDate) return false;
      if (endDate && recordDate > endDate) return false;

      //
      const min = minCost ? Number(minCost) : null;
      const max = maxCost ? Number(maxCost) : null;

      if (min !== null && record.cost < min) return false;
      if (max !== null && record.cost > max) return false;

      return true;
    });

  const resetFilters = () => {
    setDateRange({ start: "", end: "" });
    setMinCost(0);
    setMaxCost(maxCostValue);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 overflow-x-scroll bg-gray-800 p-4">
      <div className="sticky left-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-300">
          {language === "esp" ? "Historial de Combustible" : "Fuel History"}{" "}
          <p className="text-sm text-gray-400">{`(${user?.car.fuelRecords.length} ${language === "esp" ? "registros" : "records"})`}</p>
        </h1>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={50}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

      <div className="sticky left-0">
        {fuelRecords.length === 1 && (
          <div className="text-center font-bold text-yellow-200">
            {language === "esp"
              ? "Registra una carga más de combustible para comenzar a ver tus estadísticas."
              : "Log one more fuel entry to start viewing your fuel statistics."}
          </div>
        )}
        {fuelRecords.length > 1 && <FuelStats />}
      </div>

      {fuelRecords.length ? (
        <>
          <FuelTable data={fuelRecords} />
          <div></div>
          <div></div>
        </>
      ) : (
        <div className="text-center font-bold text-yellow-200">
          {language === "esp"
            ? "¡Aún no has registrado cargas de combustible! Agrega tu primera carga para comenzar a visualizar tus datos."
            : "You haven't logged any fuel entries yet! Add your first one to start visualize your data."}
        </div>
      )}
      {fuelRecords.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[1] flex flex-col gap-1">
          {filtersOpen ? (
            <div className="flex flex-col gap-4 rounded-lg border border-blue-300 bg-slate-950 p-4 shadow-sm shadow-yellow-300">
              <IoMdCloseCircle
                size={30}
                className="absolute self-end text-red-500 transition duration-300 hover:text-red-800"
                onClick={() => setFiltersOpen(false)}
              />

              <div className="mt-10 flex items-center justify-between gap-4">
                <label className="font-semibold text-blue-500">
                  {language === "esp" ? "Fecha inicio" : "Start date"}
                </label>
                <input
                  type="date"
                  className="rounded border bg-gray-800 p-2 text-gray-200"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="font-semibold text-blue-500">
                  {language === "esp" ? "Fecha fin" : "End date"}
                </label>
                <input
                  type="date"
                  className="ml-2 rounded border bg-gray-800 p-2 text-gray-200"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="font-semibold text-blue-500">
                    {language === "esp" ? "Costo mínimo" : "Min cost"}
                  </label>
                  <div className="block text-center font-bold text-gray-200">
                    ${minCost}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxCostValue - 100}
                  step="100"
                  className="w-full"
                  value={minCost}
                  onChange={(e) => setMinCost(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="font-semibold text-blue-500">
                    {language === "esp" ? "Costo máximo" : "Max cost"}
                  </label>
                  <span className="block text-center font-bold text-gray-200">
                    ${maxCost}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxCostValue}
                  step="100"
                  className="w-full"
                  value={maxCost}
                  onChange={(e) => setMaxCost(Number(e.target.value))}
                />
              </div>
              <button
                onClick={resetFilters}
                className="rounded border bg-blue-900 p-1 font-semibold transition duration-300 hover:bg-blue-700"
              >
                {language === "esp" ? "Borrar filtros" : "Reset filters"}
              </button>
            </div>
          ) : (
            <button
              className={`flex w-32 items-center justify-center gap-2 self-end rounded-lg border border-blue-500 bg-slate-950 p-2 text-blue-500 shadow-sm transition duration-300 hover:border-blue-400 hover:text-blue-400 hover:shadow-blue-500`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <TbFilter size={38} />
              <div className="font-semibold text-gray-300">
                {language === "esp" ? "Filtrar" : "Filter"}
              </div>
            </button>
          )}
        </div>
      )}
      {modalOpen && <FuelModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
