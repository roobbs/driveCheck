import { FaCarBattery } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { RiTempColdFill } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import OverviewItem from "./OverviewItem";

export default function Overview() {
  const { user, language } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">
        {language === "esp" ? "Estado del vehículo" : "Overview"}
      </div>
      <section className="grid grid-cols-2 justify-around gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
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
