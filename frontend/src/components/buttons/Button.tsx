import type React from "react";

export interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}
export const SubmitButton = ({
  className = "",
  children,
  disabled = false,
  onClick,
}: Readonly<IButtonProps>) => {
  return (
    <button
      className={`mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700 ${className}`}
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const CancelButton = ({
  className = "",
  children,
  disabled = false,
  onClick,
  type = "button",
}: Readonly<IButtonProps>) => {
  return (
    <button
      className={`mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-red-500/20 transition hover:bg-red-700 ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
