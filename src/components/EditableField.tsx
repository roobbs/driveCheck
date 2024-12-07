import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

interface EditableFieldProps {
  label: string;
  value: string | number;
  current: string | number;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
}

export default function EditableField(props: EditableFieldProps) {
  const { label, value, current, isEditing, onChange, type } = props;
  const { language } = useContext(AuthContext);

  return (
    <div
      className={`flex flex-col gap-1 rounded-md border p-2 transition-all ${
        isEditing
          ? "border-blue-500 bg-gray-800"
          : "border-transparent bg-transparent"
      }`}
      style={{ minHeight: "3rem", width: "min-content" }}
    >
      <label className="text-sm font-medium text-gray-400">{label}</label>

      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-32 rounded border border-gray-600 bg-gray-900 px-3 py-1.5 text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div
          className="text-2xl font-semibold text-white"
          style={{ minHeight: "2.5rem", display: "flex", alignItems: "center" }}
        >
          {current || (language === "esp" ? "No registrado" : "No record")}
        </div>
      )}
    </div>
  );
}
