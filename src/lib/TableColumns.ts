import { GridColDef } from "@mui/x-data-grid";

export const columnsAdmin: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'title', headerName: 'Título', width: 300, editable: true },
    { field: 'date', headerName: 'Fecha', width: 150 },
    { field: 'size', headerName: 'Tamaño', width: 90 },
];

export const columnsUser: GridColDef[] = [
    { field: 'title', headerName: 'Título', width: 300, editable: true },
    { field: 'date', headerName: 'Fecha', width: 150 },
    { field: 'size', headerName: 'Tamaño', width: 90 },
];
