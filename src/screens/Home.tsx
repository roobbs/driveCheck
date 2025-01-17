import Summary from "../components/Summary";
import Overview from "../components/Overview";
import MaintenanceHistory from "../components/MaintenanceHistory";
import FuelTracker from "../components/FuelSection";
import Buttons from "../components/ButtonsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 bg-gray-800 p-4">
      <Summary />
      <Overview />
      <Buttons />
      <FuelTracker />
      <MaintenanceHistory />
    </main>
  );
}
