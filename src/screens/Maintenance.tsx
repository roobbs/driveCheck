import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";
import AddRecordModal from "../components/modals/AddRecordModal";
import { TbFilterSearch } from "react-icons/tb";
import MaintenanceTable from "../components/tables/MaintenanceTable";
import { IoMdCloseCircle } from "react-icons/io";

export default function Maintenance() {
  const { user, language } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const maxCostValue = user?.car?.maintenanceHistory?.length
    ? Math.max(
        ...user.car.maintenanceHistory.map(
          (record) => record.partCost + record.laborCost,
        ),
      ) + 200
    : 0;

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(maxCostValue);
  const [searchQuery, setSearchQuery] = useState("");

  const maintenanceArray = (user?.car?.maintenanceHistory || [])
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
      const totalCost = record.partCost + record.laborCost;
      const min = minCost ? Number(minCost) : null;
      const max = maxCost ? Number(maxCost) : null;

      if (min !== null && totalCost < min) return false;
      if (max !== null && totalCost > max) return false;

      //
      const search = searchQuery.trim().toLowerCase();
      if (search && !record.description.toLowerCase().includes(search)) {
        return false;
      }

      return true;
    });

  const resetFilters = () => {
    setDateRange({ start: "", end: "" });
    setMinCost(0);
    setMaxCost(maxCostValue);
    setSearchQuery("");
  };

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <div className="sticky left-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-300">
          {language === "esp"
            ? "Historial de Mantenimiento"
            : "Maintenance History"}
          <p className="text-sm text-gray-400">{`(${user?.car.maintenanceHistory.length} ${language === "esp" ? "registros" : "records"})`}</p>
        </h1>
        <FaCirclePlus
          onClick={() => setModalOpen(true)}
          size={50}
          className="text-yellow-300 transition hover:text-yellow-400"
        />
      </div>

      {maintenanceArray.length ? (
        <>
          <MaintenanceTable data={maintenanceArray} />
          <div></div>
          <div></div>
        </>
      ) : (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <div className="text-center font-bold text-yellow-200">
            {language === "esp"
              ? "¡Aún no has agregado ningun registro de mantenimiento! Agrega el primer mantenimiento de tu auto para visualizar tus datos."
              : "You haven't added any maintenance records yet! Add your car's first maintenance to view your data."}
          </div>
        </section>
      )}

      {maintenanceArray.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[1] flex flex-col gap-1">
          {filtersOpen ? (
            <div className="flex flex-col gap-4 rounded-lg border border-blue-300 bg-slate-950 p-4 shadow-sm shadow-yellow-300">
              <IoMdCloseCircle
                size={30}
                className="absolute self-end text-red-500 transition duration-300 hover:text-red-800"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="mt-4 flex flex-col gap-1">
                <label className="font-semibold text-blue-500">
                  {language === "esp" ? "Buscar" : "Search"}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === "esp"
                      ? "Buscar entre registros..."
                      : "Search records..."
                  }
                  className="w-full rounded border bg-gray-800 p-2 text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
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
                {language === "esp" ? "Restablecer filtros" : "Reset filters"}
              </button>
            </div>
          ) : (
            <button
              className={`flex w-48 items-center justify-center gap-2 self-end rounded-lg border border-blue-500 bg-slate-950 p-2 text-blue-500 shadow-sm transition duration-300 hover:border-blue-400 hover:text-blue-400 hover:shadow-blue-500`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <TbFilterSearch size={38} />
              <div className="font-semibold text-gray-300">
                {language === "esp" ? "Buscar y filtrar" : "Search and filter"}
              </div>
            </button>
          )}
        </div>
      )}

      {modalOpen && <AddRecordModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
