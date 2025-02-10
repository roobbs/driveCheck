import { useContext, useMemo } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { Reminder } from "../../utils/Interfaces";

export default function useReminders() {
  const { user } = useContext(AuthContext);

  const reminders =
    user?.car.upcomingReminders.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ) || [];
  const currentDate = new Date();

  return useMemo(() => {
    const urgentReminders: Reminder[] = [];
    const futureReminders: Reminder[] = [];

    reminders.forEach((reminder) => {
      const reminderDate = new Date(reminder.date);
      const differenceInTime = reminderDate.getTime() - currentDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

      if (differenceInDays <= 30) {
        urgentReminders.push(reminder);
      } else {
        futureReminders.push(reminder);
      }
    });

    const totalUrgentReminders = urgentReminders.length;
    const totalFutureReminders = futureReminders.length;

    return {
      urgentReminders,
      futureReminders,
      totalUrgentReminders,
      totalFutureReminders,
    };
  }, [reminders]);
}
