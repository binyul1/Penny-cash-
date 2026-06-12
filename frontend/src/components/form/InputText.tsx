import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

interface InputTextProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  errMsg?: string;
}

export function InputText<T extends FieldValues>({
  label,
  name,
  control,
  type = "text",
  placeholder = "",
  autoComplete,
  className = "",
  errMsg = "",
}: InputTextProps<T>) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              className={`mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${className}`}
            />
            <span className="text-sm text-red-600">{errMsg}</span>
          </>
        )}
      />
    </label>
  );
}
