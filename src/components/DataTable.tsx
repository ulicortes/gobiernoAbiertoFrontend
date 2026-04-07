"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValidRowModel, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef<any>[];
  showActions?: boolean;
}

export default function DataTable({ rows, columns, showActions }: DataTableProps) {
  const actionsColumn: GridColDef = {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    width: 120,
    getActions: (params) => [
      <GridActionsCellItem
        key="edit"
        icon={<EditIcon />}
        label="Editar"
        onClick={() => console.log('Editar', params.id)}
      />,
      <GridActionsCellItem
        key="delete"
        icon={<DeleteIcon />}
        label="Eliminar"
        onClick={() => console.log('Eliminar', params.id)}
      />,
    ],
  };

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;

  return (
    <Box sx={{ height: 600, width: '90%' }}>
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
      />
    </Box>
  );
}