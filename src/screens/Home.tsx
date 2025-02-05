import Summary from "../components/sections/Summary";
import Overview from "../components/sections/Overview";
import MaintenanceHistory from "../components/sections/MaintenanceHistory";
import Buttons from "../components/sections/ButtonsSection";
import FuelStatsSummary from "../components/sections/FuelSummary";
import Charts from "../components/sections/Charts";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 bg-gray-800 p-4">
      <Summary />
      <Overview />
      <FuelStatsSummary />
      <Charts />
      <MaintenanceHistory />
      <Buttons />
    </main>
  );
}
