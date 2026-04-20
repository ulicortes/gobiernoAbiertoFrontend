"use client";

import { useCallback, useEffect, useState } from "react";
import { servicio } from "@/services/service";
import type { PanelUserRow } from "@/types/managedUser";
import DataTable from "@/components/ui/DataTable";
import CreateUser from "@/components/forms/CreateUser";
import ResetPassword from "@/components/forms/ResetPassword";
import { GridColDef, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import LockResetIcon from "@mui/icons-material/LockReset";

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

  const handleRowUpdate = async (newRow: any) => {
    try {
      await servicio.actualizarUsuario(newRow.id, {
        name: newRow.name,
        surname: newRow.surname,
        email: newRow.email,
        role: newRow.role,
      });
      return newRow;
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string } } };
      console.error(ax.response?.data?.message || "Error al actualizar usuario.");
      return newRow;
    }
  };

  const handleRowDelete = async (id: any) => {
    try {
      await servicio.eliminarUsuario(id);
      await load();
    } catch (e) {
      console.error(e);
    }
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

      {loadError && <p className="text-red-600">{loadError}</p>}

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
          height={350}
        />
      )}

      <ResetPassword user={resetUser} onClose={() => setResetUser(null)} />
    </div>
  );
}
