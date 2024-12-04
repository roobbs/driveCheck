import { MdNotificationsNone } from "react-icons/md";

export default function Remider() {
  return (
    <div className="flex items-center gap-3 rounded border border-white p-2">
      <MdNotificationsNone size={25} className="text-yellow-300" />
      <div className="flex flex-col items-center gap-1">
        <div className="text-lg font-bold">Battery replacement</div>
        <div>
          <div className="font-bold italic text-blue-400">
            Due in 231,750 mi | 23-feb-24
          </div>
        </div>
      </div>
    </div>
  );
}
