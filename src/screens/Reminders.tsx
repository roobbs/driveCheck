import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import Reminder from "../components/elements/Reminder";
import { FaCirclePlus } from "react-icons/fa6";
import AddReminderModal from "../components/modals/AddReminderModal";

export default function Reminders() {
  const { user, language } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const reminders = user?.car?.upcomingReminders || [];
  const currentDate = new Date();

  const pendingReminders = reminders
    .filter((reminder) => {
      const reminderDate = new Date(reminder.date);
      return (
        reminderDate.getFullYear() < currentDate.getFullYear() ||
        (reminderDate.getFullYear() === currentDate.getFullYear() &&
          reminderDate.getMonth() <= currentDate.getMonth())
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const futureReminders = reminders
    .filter((reminder) => !pendingReminders.includes(reminder))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="flex flex-1 flex-col gap-6 bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-yellow-300">
          {language === "esp" ? "Recordatorios" : "Reminders"}
        </h2>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={50}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

      {pendingReminders.length === 0 && futureReminders.length === 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <div className="text-center font-bold text-yellow-200">
            {language === "esp"
              ? "No tienes recordatorios en este momento. ¡Agrega uno para comenzar!"
              : "You have no reminders at the moment. Add one to get started!"}
          </div>
        </section>
      )}

      {pendingReminders.length > 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h3 className="text-center text-lg font-bold text-yellow-300">
            {language === "esp" ? "Este mes" : "This month"}
          </h3>

          <div className="grid gap-4 780p:grid-cols-1">
            {pendingReminders.map((reminder, index) => (
              <Reminder
                key={index}
                date={reminder.date}
                description={reminder.description}
                odometer={reminder.odometer}
              />
            ))}
          </div>
        </section>
      )}

      {futureReminders.length > 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h2 className="text-lg font-bold text-yellow-300">
            {language === "esp"
              ? "Próximos recordatorios"
              : "Upcoming Reminders"}
          </h2>

          <div className="grid gap-4 780p:grid-cols-1">
            {futureReminders.map((reminder, index) => (
              <Reminder
                key={index}
                date={reminder.date}
                description={reminder.description}
                odometer={reminder.odometer}
              />
            ))}
          </div>
        </section>
      )}

      {modalOpen && <AddReminderModal closeModal={() => setModalOpen(false)} />}
    </main>
  );
}
