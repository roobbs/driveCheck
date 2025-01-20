import { RiArrowGoBackFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

interface DeleteReminderProps {
  date: string;
  description: string;
  odometer: number | undefined;
  setShowConfirm: (value: boolean) => void;
  daysUntilReminder: number;
}

export default function DeleteReminderModal(props: DeleteReminderProps) {
  const { date, description, odometer, setShowConfirm, daysUntilReminder } =
    props;
  const { user, language, updateUser } = useContext(AuthContext);

  const handleDeleteReminder = async () => {
    try {
      if (!user?.uid) {
        alert(
          language === "esp"
            ? "Usuario no autenticado"
            : "User not authenticated",
        );
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      const updatedReminders = user.car.upcomingReminders.filter(
        (entry) =>
          !(
            entry.date === date &&
            entry.description === description &&
            entry.odometer === odometer
          ),
      );

      await updateDoc(userDocRef, {
        "car.upcomingReminders": updatedReminders,
      });

      updateUser({
        car: {
          ...user.car,
          upcomingReminders: updatedReminders,
        },
      });
      setShowConfirm(false);
    } catch (error) {
      console.error("Error al eliminar el recordatorio:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div className="rounded-lg border border-blue-400 bg-gray-900 p-6 text-center">
        <p className="font-bold text-white">
          {daysUntilReminder <= 14
            ? language === "esp"
              ? "¿Quieres marcar este recordatorio como realizado?"
              : "Do you want to mark this reminder as done?"
            : language === "esp"
              ? "¿Estás seguro de eliminar este recordatorio?"
              : "Are you sure you want to delete this reminder?"}
        </p>
        <div className="flex items-center justify-center gap-1 text-yellow-300">
          <IoNotificationsOutline /> {description}
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-red-500 px-4 py-1 text-white transition hover:bg-red-600"
            onClick={handleDeleteReminder}
          >
            {daysUntilReminder <= 14
              ? language === "esp"
                ? "Si, eliminar"
                : "Yes, delete"
              : language === "esp"
                ? "Eliminar"
                : "Delete"}
          </button>
          <button
            className="flex items-center gap-1 rounded bg-gray-500 px-4 py-1 text-white transition hover:bg-gray-600"
            onClick={() => setShowConfirm(false)}
          >
            <RiArrowGoBackFill /> {language === "esp" ? "Volver" : "Go back"}
          </button>
        </div>
      </div>
    </div>
  );
}
