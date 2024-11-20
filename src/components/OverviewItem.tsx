import type { OverviewEntry } from "../../utils/Interfaces";
import type { PropsWithChildren } from "react";

export default function OverviewItem(props: PropsWithChildren<OverviewEntry>) {
  const { name, level, date, children } = props;
  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{name}</div>
      {name.includes("Battery") && (
        <div className="text-lg font-bold">{level ? level : "No Data"}</div>
      )}
      {name.includes("Tire") && (
        <div className="text-lg font-bold">{level ? level : "No Data"}</div>
      )}

      {children}
      <div>{date ? date : "No checked"}</div>
    </div>
  );
}
