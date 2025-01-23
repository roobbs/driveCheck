import Summary from "../components/Summary";
import Overview from "../components/Overview";
import MaintenanceHistory from "../components/MaintenanceHistory";
import Buttons from "../components/ButtonsSection";
import FuelStatsSummary from "../components/FuelSummary";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 bg-gray-800 p-4">
      <Summary />
      <Overview />
      <FuelStatsSummary />
      <MaintenanceHistory />
      <Buttons />
    </main>
  );
}
