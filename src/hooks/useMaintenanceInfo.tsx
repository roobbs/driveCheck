import { useContext, useMemo } from "react";
import { AuthContext } from "../components/auth/AuthContext";

export function useMaintenanceInfo() {
  const { user } = useContext(AuthContext);

  const maintenanceRecords = useMemo(
    () => user?.car?.maintenanceHistory ?? [],
    [user?.car?.maintenanceHistory],
  );
  const fuelRecords = useMemo(
    () => user?.car?.fuelRecords ?? [],
    [user?.car?.fuelRecords],
  );
  const currentYear = new Date().getFullYear();

  return useMemo(() => {
    const maintenanceByYear: Record<string, number> = {};

    // Procesar mantenimientos
    maintenanceRecords.forEach((record) => {
      const year = record.date.split("-")[0];
      maintenanceByYear[year] =
        (maintenanceByYear[year] ?? 0) +
        Number(record.partCost) +
        Number(record.laborCost);
    });

    // Procesar gastos de gasolina
    fuelRecords.forEach((record) => {
      const year = record.date.split("-")[0];
      maintenanceByYear[year] =
        (maintenanceByYear[year] ?? 0) + Number(record.cost);
    });

    const fuelCostThisYear = fuelRecords.reduce(
      (sum, record) =>
        record.date.startsWith(currentYear.toString())
          ? sum + Number(record.cost)
          : sum,
      0,
    );

    const maintenanceCostThisYear = maintenanceRecords.reduce(
      (sum, record) =>
        record.date.startsWith(currentYear.toString())
          ? sum + Number(record.partCost) + Number(record.laborCost)
          : sum,
      0,
    );

    const totalCostThisYear = fuelCostThisYear + maintenanceCostThisYear;

    console.log(maintenanceByYear);

    return {
      maintenanceByYear,
      fuelCostThisYear,
      maintenanceCostThisYear,
      totalCostThisYear,
    };
  }, [maintenanceRecords, fuelRecords, currentYear]);
}
