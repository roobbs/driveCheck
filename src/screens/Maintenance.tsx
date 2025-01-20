import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";
import AddRecordModal from "../components/AddRecordModal";
import { TbFilterSearch } from "react-icons/tb";
import { TbFilterX } from "react-icons/tb";
import MaintenanceTable from "../components/MaintenanceTable";

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

  return (
    <main className="flex flex-1 flex-col gap-8 overflow-x-scroll bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-300">
          Maintenance History{" "}
          <p className="text-sm text-gray-400">{`(${maintenanceArray.length} ${language === "esp" ? "registros" : "records"})`}</p>
        </h1>
        <FaCirclePlus
          onClick={() => setModalOpen(true)}
          size={50}
          className="text-yellow-300 transition hover:text-yellow-400"
        />
      </div>

      <MaintenanceTable data={maintenanceArray} />
      <div></div>
      <div></div>

      <div className="fixed bottom-4 right-4 z-[1] flex flex-col gap-1">
        {filtersOpen && (
          <div className="flex flex-col gap-4 rounded-lg border bg-slate-950 p-4 shadow-lg">
            <div>
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
          </div>
        )}
        <button
          className={`flex w-48 items-center justify-center gap-2 self-end rounded-lg border border-blue-400 bg-slate-950 p-2 shadow-sm transition ${filtersOpen ? "border-red-600 shadow-red-600" : "border-yellow-500 shadow-yellow-600"}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? <TbFilterX size={38} /> : <TbFilterSearch size={38} />}
          {filtersOpen ? (
            <div>Close filters</div>
          ) : (
            <div>Search and filter</div>
          )}
        </button>
      </div>

      {modalOpen && <AddRecordModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
