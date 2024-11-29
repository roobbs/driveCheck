import { IoMdCloseCircleOutline } from "react-icons/io";

interface AddRecordModalProps {
  closeModal: () => void;
}

export default function AddRecordModal({ closeModal }: AddRecordModalProps) {
  return (
    <div
      className="fixed h-full w-full place-content-center bg-slate-900 bg-opacity-90 px-12"
      style={{ top: 0, left: 0 }}
    >
      <div className="modal-content relative flex flex-col items-center justify-center gap-6 rounded border border-black bg-blue-950 p-4">
        <h2>Add New Maintenance Record</h2>
        <div className="flex gap-4">
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
        <div className="flex gap-4">
          <button>Save</button>
          <button>Cancel</button>
        </div>
        <button
          onClick={closeModal}
          className="absolute"
          style={{ top: 10, right: 10 }}
        >
          <IoMdCloseCircleOutline
            size={30}
            className="text-red-700 hover:text-red-600"
          />
        </button>
      </div>
    </div>
  );
}
