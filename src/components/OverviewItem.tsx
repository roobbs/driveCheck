import type { OverviewEntry } from "../../utils/Interfaces";
import type { PropsWithChildren } from "react";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

export default function OverviewItem(props: PropsWithChildren<OverviewEntry>) {
  const { language } = useContext(AuthContext);
  const { name, nameEs, level, date, children } = props;

  const data = language === "esp" ? "Sin registro" : "No Data";
  const checked = language === "esp" ? "Sin revisar" : "No checked";

  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{language === "esp" ? nameEs : name}</div>
      {name.includes("Battery") && (
        <div className="text-lg italic">{level ? level : data}</div>
      )}
      {name.includes("Tire") && (
        <div className="text-lg italic">{level ? level : data}</div>
      )}
      {children}
      <div className="font-bold">{date ? date : checked}</div>
    </div>
  );
}
