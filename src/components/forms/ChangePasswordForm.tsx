"use client";

import { useState } from "react";
import { servicio } from "@/services/service";
import PasswordField from "@/components/ui/PasswordField";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword.length < 4) {
      setError("La nueva contraseña debe tener al menos 4 caracteres.");
      return;
    }
    if (newPassword !== confirm) {
      setError("La confirmación no coincide con la nueva contraseña.");
      return;
    }
    setPending(true);
    try {
      await servicio.changeOwnPassword(currentPassword, newPassword);
      setMessage("Contraseña actualizada correctamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string | string[] } } };
      const m = ax.response?.data?.message;
      setError(
        Array.isArray(m) ? m.join(" ") : m || "No se pudo actualizar la contraseña.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-black-base mb-2">Cambiar mi contraseña</h2>
      <p className="text-sm text-gray-600 mb-6">
        Ingresá tu contraseña actual y elegí una nueva (mínimo 4 caracteres).
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-md border border-gray-100"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="cur-pw" className="text-sm font-medium text-black-base">
            Contraseña actual
          </label>
          <PasswordField
            id="cur-pw"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="new-pw" className="text-sm font-medium text-black-base">
            Nueva contraseña
          </label>
          <PasswordField
            id="new-pw"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="conf-pw" className="text-sm font-medium text-black-base">
            Repetir nueva contraseña
          </label>
          <PasswordField
            id="conf-pw"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={4}
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-700 text-sm text-center font-medium">{message}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#333333] text-white py-2.5 rounded-lg hover:bg-black/90 disabled:opacity-60 cursor-pointer"
        >
          {pending ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </div>
  );
}
