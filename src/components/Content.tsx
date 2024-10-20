import Summary from "./Summary";
import Overview from "./Overview";
import UpcomingReminders from "./UpcomingReminders";
import MaintenanceHistory from "./MaintenanceHistory";

export default function Content() {
  return (
    <main className="flex flex-1 flex-col gap-8 bg-gray-800 p-4">
      <Summary />
      <Overview />
      <UpcomingReminders />
      <MaintenanceHistory />
    </main>
  );
}
