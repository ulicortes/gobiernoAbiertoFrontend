"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface DataTableProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef<any>[];
}

export default function DataTable({ rows, columns }: DataTableProps) {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}