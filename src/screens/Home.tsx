import Summary from "../components/Summary";
import Overview from "../components/Overview";
import UpcomingReminders from "../components/UpcomingReminders";
import MaintenanceHistory from "../components/MaintenanceHistory";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 bg-gray-800 p-4">
      <Summary />
      <Overview />
      <UpcomingReminders />
      <MaintenanceHistory />
    </main>
  );
}
