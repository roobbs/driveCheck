import { RiArrowGoBackFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import formatDate from "../../utils/formatDate";
import { MdOutlineAttachMoney } from "react-icons/md";

interface DeleteMaintenanceProps {
  date: string;
  description: string;
  partCost: number;
  laborCost: number;
  odometer: number;
  setShowConfirm: (value: boolean) => void;
}

export default function DeleteMaintenanceModal(props: DeleteMaintenanceProps) {
  const { date, description, partCost, laborCost, odometer, setShowConfirm } =
    props;
  const { user, language, updateUser } = useContext(AuthContext);

  const handleDeleteMaintenance = async () => {
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

      const updatedMaintenance = user.car.maintenanceHistory.filter(
        (entry) =>
          entry.date !== date &&
          entry.description !== description &&
          entry.partCost !== partCost &&
          entry.laborCost !== laborCost &&
          entry.odometer !== odometer,
      );

      await updateDoc(userDocRef, {
        "car.maintenanceHistory": updatedMaintenance,
      });

      updateUser({
        car: {
          ...user.car,
          maintenanceHistory: updatedMaintenance,
        },
      });
      setShowConfirm(false);
    } catch (error) {
      console.error("Error al eliminar este registro:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="rounded-lg border border-blue-400 bg-gray-900 p-6 text-center">
        <p className="font-bold text-white">
          {language === "esp"
            ? `¿Estás seguro de eliminar este registro con la fecha de ${formatDate(date, language)}?`
            : "Are you sure you want to delete this record?"}
        </p>
        <div className="flex items-center justify-center gap-1 text-lg text-yellow-300">
          <IoNotificationsOutline /> {description}
        </div>
        <div className="flex items-center justify-center gap-1 text-green-400">
          {language === "esp" ? "Costo total:" : "Total cost:"}{" "}
          <MdOutlineAttachMoney />
          {laborCost + partCost}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-red-500 px-4 py-1 text-white transition hover:bg-red-600"
            onClick={handleDeleteMaintenance}
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
