"use client";

import { useCallback, useEffect, useState } from "react";
import { servicio } from "@/services/service";
import type { CreateManagedUserPayload, PanelUserRow, UserRole } from "@/types/managedUser";
import PasswordField from "@/components/ui/PasswordField";

export default function UserManagementPanel() {
  const [users, setUsers] = useState<PanelUserRow[]>([]);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [formOk, setFormOk] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("admin");

  const [resetUser, setResetUser] = useState<PanelUserRow | null>(null);
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetPending, setResetPending] = useState(false);

  const load = useCallback(async () => {
    setLoadError("");
    setLoading(true);
    try {
      const list = await servicio.listUsers();
      setUsers(list || []);
    } catch {
      setLoadError("No se pudo cargar el listado de usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormOk("");
    if (password.length < 8) {
      setFormError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    const payload: CreateManagedUserPayload = {
      name,
      surname,
      email,
      password,
      role,
    };
    setCreating(true);
    try {
      await servicio.createManagedUser(payload);
      setFormOk("Usuario creado correctamente.");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setRole("admin");
      await load();
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string | string[] } } };
      const m = ax.response?.data?.message;
      setFormError(
        Array.isArray(m) ? m.join(" ") : m || "No se pudo crear el usuario.",
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resetUser) return;
    setResetError("");
    if (newPw.length < 8) {
      setResetError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (newPw !== newPw2) {
      setResetError("Las contraseñas no coinciden.");
      return;
    }
    setResetPending(true);
    try {
      await servicio.adminResetUserPassword(resetUser.id, newPw);
      setResetUser(null);
      setNewPw("");
      setNewPw2("");
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string | string[] } } };
      const m = ax.response?.data?.message;
      setResetError(
        Array.isArray(m) ? m.join(" ") : m || "No se pudo actualizar la contraseña.",
      );
    } finally {
      setResetPending(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-bold text-black-base mb-1">Usuarios del panel</h2>
        <p className="text-sm text-gray-600">
          Crear cuentas y asignar rol. Podés restablecer la contraseña de cualquier usuario.
        </p>
      </div>

      {loading && <p className="text-gray-500">Cargando…</p>}
      {loadError && <p className="text-red-600">{loadError}</p>}

      <form
        onSubmit={handleCreate}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col gap-3"
      >
        <h3 className="font-semibold text-black-base">Nuevo usuario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            required
          />
          <input
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            required
          />
          <input
            type="email"
            placeholder="Correo (también se usa para iniciar sesión)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black md:col-span-2"
            required
          />
          <PasswordField
            placeholder="Contraseña inicial (mín. 8)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!py-2"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black bg-white"
          >
            <option value="admin">Administrador</option>
            <option value="super_admin">Super administrador</option>
          </select>
        </div>
        {formError && <p className="text-red-600 text-sm">{formError}</p>}
        {formOk && <p className="text-green-700 text-sm font-medium">{formOk}</p>}
        <div className="flex w-full justify-center">
          <button
            type="submit"
            disabled={creating}
            className="w-full max-w-xs md:w-1/3 bg-[#333333] text-white px-6 py-2 rounded-lg hover:bg-black/90 disabled:opacity-60 cursor-pointer"
          >
            {creating ? "Creando…" : "Crear usuario"}
          </button>
        </div>
      </form>

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-black-base font-semibold">
              <tr>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3 w-40">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-black-base border-t border-gray-100">
                  <td className="px-4 py-2 break-all">{u.email}</td>
                  <td className="px-4 py-2">
                    {u.name} {u.surname}
                  </td>
                  <td className="px-4 py-2">
                    {u.role === "super_admin" ? "Super admin" : "Admin"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        setResetUser(u);
                        setNewPw("");
                        setNewPw2("");
                        setResetError("");
                      }}
                      className="text-blue-base underline text-left hover:no-underline cursor-pointer"
                    >
                      Nueva contraseña
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {resetUser && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 id="reset-title" className="text-black-base font-bold text-lg mb-1">
              Nueva contraseña
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Correo: <strong>{resetUser.email}</strong>
            </p>
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-3">
              <PasswordField
                placeholder="Nueva contraseña"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="!py-2"
                minLength={8}
                required
                autoComplete="new-password"
              />
              <PasswordField
                placeholder="Repetir contraseña"
                value={newPw2}
                onChange={(e) => setNewPw2(e.target.value)}
                className="!py-2"
                minLength={8}
                required
                autoComplete="new-password"
              />
              {resetError && (
                <p className="text-red-600 text-sm">{resetError}</p>
              )}
              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setResetUser(null)}
                  className="text-red-base px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={resetPending}
                  className="px-4 py-2 rounded-lg bg-[#333333] text-white disabled:opacity-60"
                >
                  {resetPending ? "Guardando…" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
