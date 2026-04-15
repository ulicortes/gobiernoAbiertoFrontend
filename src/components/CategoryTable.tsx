"use client";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridRowParams } from "@mui/x-data-grid";
import { servicio } from "../services/service";
import { NewCategory } from "@/types/newCategory";
import { useState } from "react";

interface DataTableProps {
  columns: readonly GridColDef[];
  showActions?: boolean;
}

interface row_cat {
  name: string;
  section: string;
}

interface MensajeDePadre {
  msg: string;
}

interface Props_category extends DataTableProps, MensajeDePadre {}

export default function CategoryTable({
  columns,
  showActions,
  msg,
}: Props_category) {
  const [message, setMessage] = useState("Editar categorias.");
  const [rows_cat, setRowsCat] = useState<row_cat[]>([]);

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    width: 120,
    getActions: (params) => [
      <GridActionsCellItem
        key="edit"
        icon={<EditIcon />}
        label="Editar"
        onClick={() => updateItem(params.row.id, params.row)}
      />,
      <GridActionsCellItem
        key="delete"
        icon={<DeleteIcon />}
        label="Eliminar"
        onClick={() => deleteItem(params.row.id)}
      />,
    ],
  };

  async function updateItem(id: number, cat: NewCategory) {
    try {
      await servicio
        .editarCategoria(id, cat)
        .then(() => setMessage("Categoria actualizada!"));
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteItem(id: number) {
    try {
      await servicio
        .borrarCategoria(id)
        .then(() => setMessage("Categoria borrada!"));
    } catch (e) {
      console.log(e);
    }
  }

  async function cargarCategorias() {
    try {
      await servicio.getCategorias().then((r) => {
        setRowsCat(r);
        setMessage("");
      });
    } catch (e) {
      console.log(e);
    }
  }

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;

  return (
    <Box sx={{ height: 600, width: "90%" }}>
      {message !== "" && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-black text-xl w-full text-center">{message}</h1>
          <button
            className="bg-black text-white p-2 cursor-pointer"
            onClick={() => cargarCategorias()}
          >
            Cargar categorias
          </button>
        </div>
      )}
      {message === "" && (
        <DataGrid
          rows={rows_cat}
          columns={finalColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          // autosizeOnMount // Ajusta el ancho al cargar
          // autosizeOptions={{
          //   includeOutliers: true,
          //   includeHeaders: true,
          // }}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
