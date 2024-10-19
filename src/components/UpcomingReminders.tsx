import { MdOutlineMedicalServices } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";

export default function UpcomingReminders() {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-yellow-300">Upcoming Reminders</div>
      <section className="flex flex-wrap items-center gap-x-12 gap-y-6 rounded-xl bg-gray-900 p-4 py-6">
        <div className="flex items-center gap-3 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold">Full Service</div>
            <div>
              <div className="font-bold italic text-blue-400">
                Due in 231,750 mi | 23-feb-24
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold">Battery replacement</div>
            <div>
              <div className="font-bold italic text-blue-400">
                Due in 231,750 mi | 23-feb-24
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 rounded border border-white p-2">
          <MdOutlineMedicalServices size={25} className="text-yellow-300" />
          <div className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold">Coolant change</div>
            <div>
              <div className="font-bold italic text-blue-400">
                Due in 231,750 mi | 23-feb-24
              </div>
            </div>
          </div>
        </div>

        <div>
          <FaCirclePlus size={45} className="text-yellow-300" />
        </div>
      </section>
    </div>
  );
}
