"use client";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
  GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataTableProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef[];
  showActions?: boolean;
  onRowUpdate?: (newRow: GridValidRowModel) => Promise<GridValidRowModel>;
  onRowDelete?: (id: any) => void;
  /** Acciones extra por fila, que se anteponen al botón de borrar */
  extraActions?: (params: GridRowParams) => React.ReactElement[];
  /** Si se provee, se muestra un `confirm()` con este mensaje antes de borrar */
  deleteWarning?: string;
  /** Alto del contenedor en px. Por defecto 600. */
  height?: number;
  /** Tamaño de fuente de los títulos de columna. Por defecto "0.875rem" (14 px). */
  headerFontSize?: string | number;
}

export default function DataTable({
  rows,
  columns,
  showActions,
  onRowUpdate,
  onRowDelete,
  extraActions,
  deleteWarning,
  height = 600,
  headerFontSize = "1rem",
}: DataTableProps) {
  const actionsWidth = extraActions ? 110 : 60;

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "",
    width: actionsWidth,
    getActions: (params: GridRowParams) => [
      ...(extraActions ? extraActions(params) : []),
      <GridActionsCellItem
        key="delete"
        icon={<DeleteIcon />}
        label="Eliminar"
        onClick={() => deleteItem(params.row.id)}
      />,
    ],
  };

  const processRowUpdate = async (newRow: GridValidRowModel) => {
    if (onRowUpdate) {
      return await onRowUpdate(newRow);
    }
    return newRow;
  };

  async function deleteItem(id: any) {
    if (deleteWarning && !window.confirm(deleteWarning)) return;
    if (onRowDelete) {
      onRowDelete(id);
    }
  }

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;

  return (
    <Box sx={{ height, width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <DataGrid
        sx={{
          fontFamily: "sans-serif",
          "& .MuiDataGrid-columnHeaderTitle": {
            fontFamily: "Linotte, sans-serif",
            fontSize: headerFontSize,
          },
        }}
        rows={rows}
        columns={finalColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
      />
    </Box>
  );
}
