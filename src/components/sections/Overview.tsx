import { FaCarBattery } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { RiTempColdFill } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import OverviewItem from "../OverviewItem";
import formatNumber from "../../../utils/formatNumber";

export default function Overview() {
  const { user, language } = useContext(AuthContext);

  const currentMileage =
    (user?.car?.fuelRecords || [])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .at(-1)?.odometer ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-yellow-300">
          {language === "esp" ? "Estado del vehículo" : "Overview"}
        </div>
        {currentMileage ? (
          <div className="flex flex-wrap items-center gap-1 372p:flex-col">
            <span className="text-[13px] text-blue-200">
              {language === "esp"
                ? user?.unitOfMeasure === "km"
                  ? "Kilometraje"
                  : "Millas"
                : "Mileage"}
              :
            </span>
            <span className="rounded-md border-2 border-blue-800 bg-blue-200 px-1 text-lg font-bold text-blue-900">
              {formatNumber(currentMileage)} {user?.unitOfMeasure}
            </span>
          </div>
        ) : null}
      </div>

      <section className="grid grid-cols-2 justify-around gap-6 rounded-xl bg-gray-900 p-4 py-6 680p:grid-cols-1">
        {user?.car.overview.map((entry, index) => {
          let icon;
          switch (entry.name.toLowerCase()) {
            case "oil level":
              icon = <FaOilCan size={25} className="text-yellow-300" />;
              break;
            case "battery level":
              icon = <FaCarBattery size={19} className="text-yellow-300" />;
              break;
            case "tire pressure":
              icon = <GiCarWheel size={22} className="text-yellow-300" />;
              break;
            case "coolant level":
              icon = <RiTempColdFill size={25} className="text-yellow-300" />;
              break;
            case "steering wheel oil level":
              icon = <RiTempColdFill size={25} className="text-yellow-300" />;
              break;
            default:
              icon = <RiTempColdFill size={25} className="text-yellow-300" />;
              break;
          }

          return (
            <OverviewItem
              key={index}
              name={entry.name}
              nameEs={entry.nameEs}
              level={entry.level}
              date={entry.date}
            >
              {icon}
            </OverviewItem>
          );
        })}
      </section>
    </div>
  );
}
