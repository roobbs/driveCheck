import { useContext } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { AuthContext } from "./auth/AuthContext";

export default function UpcomingReminders() {
  const { user } = useContext(AuthContext);

  const reminders = user?.car.upcomingReminders;

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Upcoming Reminders</div>
      <section className="flex flex-wrap items-center gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        {reminders?.length === 0 && (
          <div className="text-center text-xl font-bold">
            Add your first reminder here
          </div>
        )}
        <div>
          <FaCirclePlus size={45} className="text-yellow-300" />
        </div>
      </section>
    </div>
  );
}
