import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import Reminder from "../components/Reminder";

export default function Reminders() {
  const { user, language } = useContext(AuthContext);
  const reminders = user?.car?.upcomingReminders || [];

  return (
    <main className="flex flex-1 flex-col gap-6 bg-gray-800 p-6">
      <h1 className="text-xl font-bold text-yellow-300">
        {language === "esp" ? "Recordatorios" : "Reminders"}
      </h1>

      <div className="flex flex-col gap-4 rounded-lg bg-gray-900 p-6 shadow-lg">
        {reminders.length === 0 ? (
          <div className="text-center text-lg text-gray-300">
            {language === "esp"
              ? "No tienes recordatorios programados."
              : "You have no scheduled reminders."}
          </div>
        ) : (
          <div className="sm:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {reminders.map((reminder, index) => (
              <Reminder
                key={index}
                date={reminder.date}
                description={reminder.description}
                odometer={reminder.odometer}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
