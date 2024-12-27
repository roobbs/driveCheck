export default function getDays(reminderDate: string): number {
  const currentDate = new Date();
  const reminder = new Date(reminderDate);
  const timeDifference = reminder.getTime() - currentDate.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}
