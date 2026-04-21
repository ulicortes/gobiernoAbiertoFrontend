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
import DownloadIcon from "@mui/icons-material/Download";
import api from "@/services/api";

interface DataTableProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef[];
  showActions?: boolean;
  /** Muestra acción de descarga por fila (solo tablas de archivos). */
  showDownloadAction?: boolean;
  /** Distribuye columnas en el ancho disponible de la tabla. */
  distributeColumns?: boolean;
  onRowUpdate?: (newRow: GridValidRowModel) => Promise<GridValidRowModel>;
  onRowDelete?: (id: any) => void;
  /** Acciones extra por fila, que se anteponen al botón de borrar */
  extraActions?: (params: GridRowParams) => React.ReactElement[];
  /** Si se provee, se muestra un `confirm()` con este mensaje antes de borrar */
  deleteWarning?: string;
  /** Altura mínima en px. La tabla crece automáticamente hasta 10 filas. */
  height?: number;
  /** Tamaño de fuente de los títulos de columna. Por defecto "0.875rem" (14 px). */
  headerFontSize?: string | number;
}

export default function DataTable({
  rows,
  columns,
  showActions = true,
  showDownloadAction = false,
  distributeColumns = true,
  onRowUpdate,
  onRowDelete,
  extraActions,
  deleteWarning,
  //height = 400,
  headerFontSize = "1rem",
}: DataTableProps) {
  //const minTableHeight = Math.max(height, 400);
  const hasDownloadAction = showDownloadAction;
  const hasDeleteAction = Boolean(onRowDelete);
  const hasExtraActions = Boolean(extraActions);
  const hasAnyActions = hasDownloadAction || hasDeleteAction || hasExtraActions;
  const actionsWidth =
    (hasExtraActions ? 55 : 0) + (hasDownloadAction ? 55 : 0) + (hasDeleteAction ? 55 : 0);

  function getAbsoluteFileUrl(filePath: string): string {
    if (/^https?:\/\//i.test(filePath)) return filePath;
    const base = (api.defaults.baseURL || "").replace(/\/$/, "");
    const rel = filePath.replace(/^\/+/, "");
    if (!base) return `/${rel}`;
    return `${base}/${rel}`;
  }

  function canDownload(row: GridValidRowModel): boolean {
    return typeof row?.filePath === "string" && row.filePath.trim().length > 0;
  }

  function downloadFile(row: GridValidRowModel) {
    if (!canDownload(row)) return;
    const targetUrl = getAbsoluteFileUrl(row.filePath.trim());
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "",
    width: actionsWidth,
    minWidth: actionsWidth,
    maxWidth: actionsWidth,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params: GridRowParams) => {
      const isDownloadEnabled = canDownload(params.row);
      return [
        ...(hasDownloadAction
          ? [
              <GridActionsCellItem
                key="download"
                icon={<DownloadIcon />}
                label={isDownloadEnabled ? "Descargar archivo" : "Archivo no disponible"}
                disabled={!isDownloadEnabled}
                onClick={() => downloadFile(params.row)}
              />,
            ]
          : []),
        ...(extraActions ? extraActions(params) : []),
        ...(hasDeleteAction
          ? [
              <GridActionsCellItem
                key="delete"
                icon={<DeleteIcon />}
                label="Eliminar"
                onClick={() => deleteItem(params.row.id)}
              />,
            ]
          : []),
      ];
    },
  };

  const normalizedColumns: GridColDef[] = distributeColumns
    ? columns.map((column) => {
        if (column.flex !== undefined) return column;
        return {
          ...column,
          flex: 1,
          minWidth: column.minWidth ?? (typeof column.width === "number" ? column.width : 120),
        };
      })
    : [...columns];

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

  const finalColumns =
    showActions && hasAnyActions ? [...normalizedColumns, actionsColumn] : normalizedColumns;

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <DataGrid
        autoHeight
        sx={{
          width: "100%",
          minWidth: 0,
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
