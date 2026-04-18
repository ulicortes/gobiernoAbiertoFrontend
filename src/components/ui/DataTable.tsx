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

interface DataTableProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef[];
  showActions?: boolean;
  onRowUpdate?: (newRow: GridValidRowModel) => Promise<GridValidRowModel>;
  onRowDelete?: (id: any) => void;
}

export default function DataTable({
  rows,
  columns,
  showActions,
  onRowUpdate,
  onRowDelete,
}: DataTableProps) {
  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    width: 120,
    getActions: (params) => [
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
    if (onRowDelete) {
      onRowDelete(id);
    }
  }

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;

  return (
    <Box sx={{ height: 600, width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <DataGrid
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
        checkboxSelection
        // autosizeOnMount // Ajusta el ancho al cargar
        // autosizeOptions={{
        //   includeOutliers: true,
        //   includeHeaders: true,
        // }}
        disableRowSelectionOnClick
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}
