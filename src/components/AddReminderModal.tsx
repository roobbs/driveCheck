interface AddReminderModalProps {
  closeModal: () => void;
}

export default function AddReminderModal({
  closeModal,
}: AddReminderModalProps) {
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-90">
      <div className="relative w-full max-w-lg rounded-lg bg-blue-950 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300">
          Add New Reminder
        </h2>

        <form className="flex flex-col gap-5">
          {[
            { name: "description", type: "text", placeholder: "Description" },
            { name: "date", type: "date", placeholder: "Date" },
            { name: "mileage", type: "number", placeholder: "Mileage" },
          ].map((input) => (
            <div className="relative mt-2">
              <label
                htmlFor={input.name}
                className="absolute bottom-full left-2 -translate-y-full pb-1 text-sm font-bold text-white opacity-0 transition-all"
              >
                {input.placeholder}
              </label>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                onChange={handleChange}
                placeholder={input.placeholder}
                className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
                onFocus={(e) =>
                  e.target.previousElementSibling?.classList.add(
                    "opacity-100",
                    "translate-y-0",
                  )
                }
                onBlur={(e) =>
                  e.target.previousElementSibling?.classList.remove(
                    "opacity-100",
                    "translate-y-0",
                  )
                }
              />
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full rounded bg-red-600 py-2 font-bold text-white hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
