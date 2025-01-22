import { useContext, useMemo } from "react";
import { AuthContext } from "../components/auth/AuthContext";

type MonthStats = { [key: string]: number };

export function useFuelStats() {
  const { user } = useContext(AuthContext);
  const fuelRecords = user?.car.fuelRecords.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return useMemo(() => {
    if (!fuelRecords || fuelRecords.length < 2) return null;

    const totalDistance =
      fuelRecords[fuelRecords.length - 1].odometer - fuelRecords[0].odometer;

    const totalCost = fuelRecords.reduce(
      (sum, record) => sum + Number(record.cost),
      0,
    );

    const totalFuel = fuelRecords.reduce(
      (sum, record) => sum + record.fuelAmount,
      0,
    );

    const costPerKm = totalDistance > 0 ? totalCost / totalDistance : 0;

    const efficiency = totalFuel > 0 ? totalDistance / totalFuel : 0;

    const costPerLiter = totalFuel > 0 ? totalCost / totalFuel : 0;

    const costByMonth: MonthStats = {};
    fuelRecords.forEach((record) => {
      const [year, month] = record.date.split("-");
      const key = `${year}-${month}`;
      costByMonth[key] = (costByMonth[key] || 0) + Number(record.cost);
    });

    const distanceByMonth: MonthStats = {};
    fuelRecords.forEach((record, index) => {
      if (index === 0) return;
      const distance = record.odometer - fuelRecords[index - 1].odometer;
      const [year, month] = record.date.split("-");
      const key = `${year}-${month}`;
      distanceByMonth[key] = (distanceByMonth[key] || 0) + distance;
    });

    const distances = fuelRecords
      .slice(1)
      .map((record, index) => record.odometer - fuelRecords[index].odometer);

    const avgDistanceBetweenFills =
      distances.length > 0
        ? distances.reduce((sum, d) => sum + d, 0) / distances.length
        : 0;

    const fuelByMonth: MonthStats = {};
    fuelRecords.forEach((record) => {
      const [year, month] = record.date.split("-");
      const key = `${year}-${month}`;
      fuelByMonth[key] = (fuelByMonth[key] || 0) + record.fuelAmount;
    });

    return {
      totalDistance,
      costPerKm,
      efficiency,
      costPerLiter,
      costByMonth,
      fuelByMonth,
      distanceByMonth,
      avgDistanceBetweenFills,
    };
  }, [fuelRecords]);
}
