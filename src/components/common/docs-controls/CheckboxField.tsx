interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function CheckboxField({ checked, onChange, label, description }: CheckboxFieldProps) {
  return (
    <div className="space-y-2">
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
        />
        <span className="text-sm text-gray-200">{label}</span>
      </label>
    </div>
  );
}

export default CheckboxField;
