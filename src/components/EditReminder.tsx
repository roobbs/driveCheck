import { useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface EditReminderModalProps {
  date: string;
  description: string;
  odometer: number;
  closeModal: () => void;
}

export default function EditReminderModal({
  date,
  description,
  odometer,
  closeModal,
}: EditReminderModalProps) {
  const { user, updateUser, language } = useContext(AuthContext);
  const [form, setForm] = useState({
    date: date,
    description: description,
    odometer: odometer,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "odometer" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (form.date && form.description && form.odometer) {
      try {
        if (!user?.uid) {
          alert(
            language === "esp"
              ? "Usuario no autenticado"
              : "User not authenticated",
          );
          return;
        }

        const userDocRef = doc(db, "users", user?.uid);

        const updatedRemindersArray = (user.car.upcomingReminders || []).map(
          (r) => (r.date === date && description === description ? form : r),
        );

        await updateDoc(userDocRef, {
          "car.upcomingReminders": updatedRemindersArray,
        });

        updateUser({
          ...user,
          car: {
            ...user.car,
            upcomingReminders: updatedRemindersArray,
          },
        });

        closeModal();
        alert(
          language === "esp"
            ? "Recordatorio actualizado correctamente"
            : "Reminder updated successfully",
        );
      } catch (error) {
        console.error("Error updating reminder:", error);
        alert(
          language === "esp"
            ? "Hubo un error al intentar actualizar el recordatorio"
            : "Failed to update the reminder. Please try again",
        );
      }
    } else {
      alert(
        language === "esp"
          ? "Por favor llena todos los datos"
          : "Please fill in all fields!",
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="relative m-2 w-full max-w-lg rounded-lg border border-gray-500 bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300">
          {language === "esp" ? "Editar Recordatorio" : "Edit Reminder"}
        </h2>

        <form className="flex flex-col gap-5">
          {[
            {
              name: "description",
              type: "text",
              placeholder: "Description",
              placeholderEs: "Descripción",
            },
            {
              name: "date",
              type: "date",
              placeholder: "Date",
              placeholderEs: "Fecha",
            },
            {
              name: "odometer",
              type: "number",
              placeholder: "Mileage",
              placeholderEs: "Kilometraje",
            },
          ].map((input, index) => (
            <div className="relative mt-2" key={index}>
              <label
                htmlFor={input.name}
                className="absolute bottom-full left-2 -translate-y-full pb-1 text-sm font-bold text-white opacity-0 transition-all"
              >
                {language === "esp" ? input.placeholderEs : input.placeholder}
              </label>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                value={form[input.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={
                  language === "esp" ? input.placeholderEs : input.placeholder
                }
                className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
                onFocus={(e) =>
                  e.target.previousElementSibling?.classList.add(
                    "opacity-100",
                    "translate-y-0",
                  )
                }
                onBlur={(e) =>
                  e.target.previousElementSibling?.classList.remove(
                    "opacity-100",
                    "translate-y-0",
                  )
                }
              />
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-500"
            >
              {language === "esp" ? "Guardar" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full rounded bg-red-600 py-2 font-bold text-white hover:bg-red-500"
            >
              {language === "esp" ? "Cancelar" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
