import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import Reminder from "../components/elements/Reminder";
import { FaCirclePlus } from "react-icons/fa6";
import AddReminderModal from "../components/modals/AddReminderModal";
import useReminders from "../hooks/useReminders";

export default function Reminders() {
  const { language } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const { urgentReminders, futureReminders } = useReminders();

  return (
    <main className="flex flex-1 flex-col gap-6 bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-yellow-300">
          {language === "esp" ? "Recordatorios" : "Reminders"}
          <span className="text-md text-gray-400">
            {" "}
            {`(${urgentReminders.length + futureReminders.length})`}
          </span>
        </h2>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={50}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>

      {urgentReminders.length === 0 && futureReminders.length === 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <div className="text-center font-bold text-yellow-200">
            {language === "esp"
              ? "No tienes recordatorios en este momento. ¡Agrega uno para comenzar!"
              : "You have no reminders at the moment. Add one to get started!"}
          </div>
        </section>
      )}

      {urgentReminders.length > 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h3 className="text-center text-lg font-bold text-yellow-300">
            {language === "esp" ? "Proximos 30 dias" : "Next 30 days"}{" "}
            <span className="text-md text-gray-400">
              {" "}
              {`(${urgentReminders.length})`}
            </span>
          </h3>

          <div className="900p-min:justify-center grid gap-4 780p:grid-cols-1">
            {urgentReminders.map((reminder, index) => (
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
          <h3 className="text-lg font-bold text-yellow-300">
            {language === "esp" ? "Próximos pendientes" : "Upcoming Reminders"}
            <span className="text-md text-gray-400">
              {" "}
              {`(${futureReminders.length})`}
            </span>
          </h3>

          <div className="900p-min:justify-center grid gap-4 780p:grid-cols-1">
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
