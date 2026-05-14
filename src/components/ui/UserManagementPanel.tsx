"use client";

import { useCallback, useEffect, useState } from "react";
import { servicio } from "@/services/service";
import type { PanelUserRow } from "@/types/managedUser";
import DataTable from "@/components/ui/DataTable";
import CreateUser from "@/components/forms/CreateUser";
import ResetPassword from "@/components/forms/ResetPassword";
import { GridColDef, GridActionsCellItem, GridRowParams, GridCellParams } from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const USER_COLUMNS: GridColDef[] = [
  { field: "name", headerName: "Nombre", flex: 1, minWidth: 90, editable: true },
  { field: "surname", headerName: "Apellido", flex: 1, minWidth: 90, editable: true },
  { field: "email", headerName: "Correo", flex: 1.8, minWidth: 130, editable: true },
  {
    field: "role",
    headerName: "Rol",
    flex: 1.2,
    minWidth: 120,
    editable: true,
    type: "singleSelect",
    valueOptions: [
      { value: "admin", label: "Administrador" },
      { value: "super_admin", label: "Super administrador" },
    ],
  },
];

export default function UserManagementPanel() {
  const [users, setUsers] = useState<PanelUserRow[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [resetUser, setResetUser] = useState<PanelUserRow | null>(null);

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

  const extractBackendMessage = (err: unknown, fallback: string): string => {
    const ax = err as {
      response?: { data?: { message?: string | string[] } };
    };
    const raw = ax.response?.data?.message;
    if (Array.isArray(raw)) return raw.join(" ");
    return raw || fallback;
  };

  const handleRowUpdate = async (newRow: any, oldRow?: any) => {
    setActionError("");
    try {
      await servicio.actualizarUsuario(newRow.id, {
        name: newRow.name,
        surname: newRow.surname,
        email: newRow.email,
        role: newRow.role,
      });
      return newRow;
    } catch (err: unknown) {
      const message = extractBackendMessage(
        err,
        "No se pudo actualizar el usuario. Intentá nuevamente.",
      );
      setActionError(message);
      return oldRow ?? newRow;
    }
  };

  const handleRowDelete = async (id: any) => {
    setActionError("");
    try {
      await servicio.eliminarUsuario(id);
      await load();
    } catch (err: unknown) {
      const message = extractBackendMessage(
        err,
        "No se pudo eliminar el usuario. Intentá nuevamente.",
      );
      setActionError(message);
    }
  };

  const isCellEditable = (params: GridCellParams) => {
    if (params.field === "role" && params.row?.role === "super_admin") {
      return false;
    }
    return true;
  };

  const extraActions = (params: GridRowParams) => [
    <GridActionsCellItem
      key="password"
      icon={<LockResetIcon />}
      label="Nueva contraseña"
      onClick={() => setResetUser(params.row as PanelUserRow)}
    />,
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-bold text-black-base mb-1">Usuarios del panel</h2>
        <p className="text-sm text-gray-600">
          Crear cuentas y asignar rol. Doble clic en una celda para editarla. Podés
          restablecer la contraseña de cualquier usuario con el ícono de candado.
        </p>
      </div>

      <div
        role="alert"
        aria-live="polite"
        className="mx-auto w-full flex flex-col items-center gap-2 px-6 py-5 bg-red-50 border-2 border-red-600 rounded-lg shadow-md text-center"
      >
        <WarningAmberIcon
          fontSize="large"
          className="text-red-600"
          aria-hidden="true"
        />
        <h3 className="font-bold uppercase tracking-wide text-red-700 text-base sm:text-lg">
          Atención
        </h3>
        <p className="text-red-800 text-sm sm:text-base leading-relaxed max-w-2xl">
          Debe existir{" "}
          <strong className="font-bold uppercase">siempre al menos un super administrador</strong>{" "}
          activo para poder ingresar al panel y gestionar a los administradores.
          No elimines ni cambies el rol del último super administrador disponible.
        </p>
      </div>

      {loadError && <p className="text-red-600">{loadError}</p>}

      {actionError && (
        <Alert
          severity="error"
          onClose={() => setActionError("")}
          sx={{ alignItems: "center" }}
        >
          {actionError}
        </Alert>
      )}

      <CreateUser onCreated={load} />

      {!loading && (
        <DataTable
          rows={users}
          columns={USER_COLUMNS}
          showActions
          extraActions={extraActions}
          deleteWarning="¿Estás segura/o de que querés eliminar este usuario? Esta acción no se puede deshacer."
          onRowUpdate={handleRowUpdate}
          onRowDelete={handleRowDelete}
          isCellEditable={isCellEditable}
        />
      )}

      <ResetPassword user={resetUser} onClose={() => setResetUser(null)} />
    </div>
  );
}
