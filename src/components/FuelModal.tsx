import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface FuelModalProps {
  closeModal: () => void;
}

export default function FuelModal({ closeModal }: FuelModalProps) {
  const [form, setForm] = useState({
    date: "",
    odometer: 0,
    fuelAmount: 0,
    cost: 0,
  });
  const { user, updateUser, language } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "odometer" || name === "fuelAmount" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (form.date && form.odometer && form.fuelAmount && form.cost) {
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

        const updatedFuelRecordsArray = [
          ...(user.car?.fuelRecords || []),
          form,
        ];

        await updateDoc(userDocRef, {
          "car.fuelRecords": updatedFuelRecordsArray,
        });

        updateUser({
          ...user,
          car: {
            ...user.car,
            fuelRecords: updatedFuelRecordsArray,
          },
        });

        closeModal();
        alert(
          language === "esp"
            ? "Registro de combustible guardado correctamente"
            : "Fuel record saved successfully",
        );
      } catch (error) {
        console.error("Error saving fuel record:", error);
        alert(
          language === "esp"
            ? "Hubo un error al intentar guardar el registro"
            : "Failed to save the fuel record. Please try again",
        );
      }
    } else {
      alert(
        language === "esp"
          ? "Por favor completa todos los campos"
          : "Please fill in all fields",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="relative m-2 w-full max-w-lg rounded-lg border border-gray-500 bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300">
          {language === "esp"
            ? "Agregar Registro de Combustible"
            : "Add Fuel Record"}
        </h2>

        <form className="flex flex-col gap-5">
          {[
            {
              name: "date",
              type: "date",
              placeholder: "Date",
              placeholderEs: "Fecha",
            },
            {
              name: "odometer",
              type: "number",
              placeholder: "Odometer",
              placeholderEs: "Kilometraje",
            },
            {
              name: "fuelAmount",
              type: "number",
              placeholder: "Fuel Amount (L)",
              placeholderEs: "Cantidad de Combustible (L)",
            },
            {
              name: "cost",
              type: "number",
              placeholder: "Cost",
              placeholderEs: "Costo",
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
