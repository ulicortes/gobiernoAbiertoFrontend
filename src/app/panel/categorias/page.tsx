"use client";

import { useEffect, useState } from "react";
import { servicio } from "@/services/service";
import DataTable from "@/components/ui/DataTable";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import { columnsCategories } from "@/lib/TableColumns";

export default function CategoriasPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState("");

  async function cargarCategorias() {
    try {
      const r = await servicio.getCategorias();
      setRows(r || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Recarga la tabla cada vez que AddCategoryForm señaliza un nuevo registro
  useEffect(() => {
    if (refreshTrigger) {
      cargarCategorias();
      window.dispatchEvent(new Event("panel:categories-changed"));
    }
  }, [refreshTrigger]);

  const handleRowUpdate = async (newRow: any) => {
    try {
      await servicio.editarCategoria(newRow.id, {
        name: newRow.name,
        section: newRow.section,
      });
      cargarCategorias();
      window.dispatchEvent(new Event("panel:categories-changed"));
      return newRow;
    } catch (e) {
      console.error(e);
      return newRow;
    }
  };

  const handleRowDelete = async (id: any) => {
    try {
      await servicio.borrarCategoria(id);
      cargarCategorias();
      window.dispatchEvent(new Event("panel:categories-changed"));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full">
      <AddCategoryForm enviarAlPadre={setRefreshTrigger} />
      <DataTable
        rows={rows}
        columns={columnsCategories}
        showActions
        deleteWarning="¿Eliminar esta categoría? Se eliminarán también todos los archivos asociados y esta acción no se puede deshacer."
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
      />
    </div>
  );
}
