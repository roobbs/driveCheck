import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";
import AddRecordModal from "../components/AddRecordModal";
// import { TbFilterSearch } from "react-icons/tb";
import MaintenanceTable from "../components/MaintenanceTable";

export default function Maintenance() {
  const { user, language } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  // const [filtersOpen, setFiltersOpen] = useState(false);

  // const [dateRange, setDateRange] = useState({ start: "", end: "" });
  // const [minCost, setMinCost] = useState("");
  // const [maxCost, setMaxCost] = useState("");

  const maintenanceArray = (user?.car?.maintenanceHistory || []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  // .filter((record) => {
  //   // Filtro por rango de fechas
  //   const recordDate = new Date(record.date).getTime();
  //   const startDate = dateRange.start
  //     ? new Date(dateRange.start).getTime()
  //     : null;
  //   const endDate = dateRange.end ? new Date(dateRange.end).getTime() : null;

  //   if (startDate && recordDate < startDate) return false;
  //   if (endDate && recordDate > endDate) return false;

  //   // Filtro por costo
  //   const totalCost = record.partCost + record.laborCost;
  //   const min = minCost ? parseFloat(minCost) : null;
  //   const max = maxCost ? parseFloat(maxCost) : null;

  //   if (min !== null && totalCost < min) return false;
  //   if (max !== null && totalCost > max) return false;

  //   return true;
  // });

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

      {/* <div className="fixed bottom-4 right-4 z-20 rounded-lg border border-blue-500 bg-gray-900 p-2">
        <div
          className="flex cursor-pointer items-center justify-end gap-2"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <TbFilterSearch size={40} />
          <div>Search and filter</div>
        </div>
      </div>
      {filtersOpen && (
        <div className="mb-4 flex flex-wrap gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <div>
            <label className="text-yellow-300">
              {language === "esp" ? "Fecha inicio" : "Start date"}
            </label>
            <input
              type="date"
              className="ml-2 rounded border bg-gray-800 p-2 text-gray-200"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-yellow-300">
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
            <label className="text-yellow-300">
              {language === "esp" ? "Costo mínimo" : "Min cost"}
            </label>
            <input
              type="number"
              className="ml-2 rounded border bg-gray-800 p-2 text-gray-200"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value)}
            />
          </div>
          <div>
            <label className="text-yellow-300">
              {language === "esp" ? "Costo máximo" : "Max cost"}
            </label>
            <input
              type="number"
              className="ml-2 rounded border bg-gray-800 p-2 text-gray-200"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
            />
          </div>
        </div>
      )} */}

      {modalOpen && <AddRecordModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
