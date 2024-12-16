import { useContext, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { AuthContext } from "./auth/AuthContext";
import Reminder from "./Reminder";
import AddReminderModal from "./AddReminderModal";

export default function UpcomingReminders() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, language } = useContext(AuthContext);

  const reminders = user?.car.upcomingReminders;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        <div className="font-bold text-yellow-300">
          {language === "esp" ? "Recordatorios" : "Upcoming Reminders"}
        </div>
        <div onClick={() => setModalOpen(true)}>
          <FaCirclePlus
            size={45}
            className="text-yellow-300 transition hover:text-yellow-400"
          />
        </div>
      </div>
      <section className="grid grid-cols-2 justify-around gap-6 rounded-xl bg-gray-900 p-4 py-6 680p:grid-cols-1">
        {reminders?.length === 0 && (
          <div className="text-center text-xl font-bold">
            {language === "esp" ? "Agrega un recordatorio" : "Add a reminder"}
          </div>
        )}
        {reminders && reminders.length > 0 && (
          <>
            {reminders?.map((rec, index) => (
              <Reminder
                key={index}
                description={rec.description}
                date={rec.date}
                mileage={rec.mileage}
              />
            ))}
          </>
        )}

        {modalOpen && (
          <AddReminderModal closeModal={() => setModalOpen(false)} />
        )}
      </section>
    </div>
  );
}
