"use client";

import { forwardRef, useId, useState } from "react";

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? "h-5 w-5"}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 5 12 5c4.638 0 8.573 2.51 9.964 6.683a1.01 1.01 0 010 .636C20.577 16.49 16.64 19 12 19c-4.638 0-8.573-2.51-9.964-6.684zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeSlashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? "h-5 w-5"}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19 12 19c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 5c4.756 0 8.773 2.663 10.065 7.098a10.525 10.525 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export type PasswordFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const defaultInputClass =
  "w-full border border-gray-300 rounded-lg py-2.5 pl-3 pr-11 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500";

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ id, className, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    const autoId = useId();
    const inputId = id ?? autoId;
    const mergedClass = `${defaultInputClass} ${className ?? ""}`.trim();

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          className={mergedClass}
          {...rest}
        />
        <button
          type="button"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          tabIndex={-1}
        >
          {visible ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  },
);

export default PasswordField;
