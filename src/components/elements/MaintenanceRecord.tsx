import { MdOutlineMedicalServices } from "react-icons/md";
import type { MaintenanceRecord } from "../../../utils/Interfaces";
import { AuthContext } from "../auth/AuthContext";
import { useContext, useState } from "react";
import formatDate from "../../../utils/formatDate";
import formatNumber from "../../../utils/formatNumber";
import { MdOutlineDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import DeleteMaintenanceModal from "../modals/DeleteMaintenance";
import EditRecordModal from "../modals/EditRecord";

export default function MaintenanceRecord(props: MaintenanceRecord) {
  const { date, description, laborCost, partCost, odometer } = props;
  const { language, user } = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex justify-center gap-1">
      <div className="maintenanceContainer grid w-[900px] grid-cols-2 items-center gap-6 justify-self-center rounded border border-gray-500 bg-gray-800 p-4 shadow-md 1280p:w-[70%] 1180p:w-[80%] 900p:w-[100%] 650p:grid-cols-1 650p:gap-1">
        <div className="flex items-center gap-4">
          <MdOutlineMedicalServices size={35} className="text-yellow-300" />
          <div className="text-lg font-bold text-blue-100">{description}</div>
        </div>

        <div className="flex flex-wrap justify-around gap-6 text-center 390p:gap-2">
          <div>
            <div className="text-sm font-bold text-gray-400">
              {language === "esp" ? "Fecha" : "Date"}
            </div>
            <div className="font-semibold text-blue-400">
              {formatDate(date, language)}
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-400">
              {language === "esp" ? "Costo Total" : "Total Cost"}
            </div>
            <div className="font-semibold text-blue-400">
              ${formatNumber(laborCost + partCost)}
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-400">
              {language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilómetros"
                  : "Millas"
                : user?.unitOfMeasure === "km"
                  ? "Kilometers"
                  : "Miles"}
            </div>
            <div className="font-semibold text-blue-400">
              {formatNumber(odometer)} {user?.unitOfMeasure}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <div
          className="flex items-center justify-center text-yellow-300 transition duration-300 hover:scale-110 hover:text-yellow-500"
          onClick={() => {
            setShowEdit(true);
          }}
        >
          <MdModeEditOutline size={22} />
        </div>
        <div
          className="flex items-center justify-center text-red-500 transition duration-300 hover:scale-110 hover:text-red-600"
          onClick={() => setShowDelete(true)}
        >
          <MdOutlineDelete size={22} />
        </div>
      </div>

      {showEdit && (
        <EditRecordModal
          date={date}
          description={description}
          partCost={partCost}
          laborCost={laborCost}
          odometer={odometer}
          closeModal={() => setShowEdit(false)}
        />
      )}
      {showDelete && (
        <DeleteMaintenanceModal
          date={date}
          description={description}
          partCost={partCost}
          laborCost={laborCost}
          odometer={odometer}
          setShowConfirm={setShowDelete}
        />
      )}
    </div>
  );
}
