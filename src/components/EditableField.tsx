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
    <div className="flex items-center justify-between gap-4">
      <span className="text-blue-400">{label}</span>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="rounded px-2 py-1 text-xl font-bold"
        />
      ) : (
        <div className="text-xl font-bold">
          {current || (language === "esp" ? "No registrado" : "No record")}
        </div>
      )}
    </div>
  );
}
