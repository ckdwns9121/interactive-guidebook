import { ReactNode } from "react";

interface ControlFieldProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export function ControlField({ label, description, children }: ControlFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">{label}</label>
      {description && <p className="text-xs text-gray-400">{description}</p>}
      {children}
    </div>
  );
}

export default ControlField;
