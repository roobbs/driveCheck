import { RiArrowGoBackFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import formatDate from "../../../utils/formatDate";
import { MdOutlineAttachMoney } from "react-icons/md";

interface DeleteFuelProps {
  date: string;
  fuelAmount: number;
  cost: number;
  odometer: number;
  setShowConfirm: (value: boolean) => void;
}

export default function DeleteFuelModal(props: DeleteFuelProps) {
  const { date, fuelAmount, cost, odometer, setShowConfirm } = props;
  const { user, language, updateUser } = useContext(AuthContext);

  const handleDeleteFuel = async () => {
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

      const updatedFuelHistory = user.car.fuelRecords.filter(
        (entry) =>
          !(
            entry.date === date &&
            entry.fuelAmount === fuelAmount &&
            entry.cost === cost &&
            entry.odometer === odometer
          ),
      );

      await updateDoc(userDocRef, {
        "car.fuelRecords": updatedFuelHistory,
      });

      updateUser({
        car: {
          ...user.car,
          fuelRecords: updatedFuelHistory,
        },
      });
      setShowConfirm(false);
    } catch (error) {
      console.error("Error al eliminar este registro de combustible:", error);
      alert("Error");
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div className="rounded-lg border border-blue-400 bg-gray-900 p-6 text-center">
        <p className="font-bold text-white">
          {language === "esp"
            ? `¿Estás seguro de eliminar este registro con la fecha de ${formatDate(date, language)}?`
            : "Are you sure you want to delete this fuel record?"}
        </p>
        <div className="flex items-center justify-center gap-1 text-lg text-yellow-300">
          <IoNotificationsOutline />{" "}
          {language === "esp" ? "Cantidad de combustible:" : "Fuel amount:"}{" "}
          {fuelAmount} L
        </div>
        <div className="flex items-center justify-center gap-1 text-green-400">
          {language === "esp" ? "Costo total:" : "Total cost:"}{" "}
          <MdOutlineAttachMoney />
          {cost}
        </div>
        <div className="flex items-center justify-center gap-1 text-blue-400">
          {language === "esp" ? "Odómetro:" : "Odometer:"} {odometer} km
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-red-500 px-4 py-1 text-white transition hover:bg-red-600"
            onClick={handleDeleteFuel}
          >
            {language === "esp" ? "Eliminar" : "Delete"}
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
