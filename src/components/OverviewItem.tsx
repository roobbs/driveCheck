import type { OverviewEntry } from "../../utils/Interfaces";
import type { PropsWithChildren } from "react";

export default function OverviewItem(props: PropsWithChildren<OverviewEntry>) {
  const { name, level, date, children } = props;
  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{name}</div>
      <div className="text-lg font-bold">{level}</div>
      {children}
      <div>{date}</div>
    </div>
  );
}
