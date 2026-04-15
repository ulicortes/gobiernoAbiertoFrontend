import { GridColDef } from "@mui/x-data-grid";

export const columnsFile: GridColDef[] = [
  { field: "title", headerName: "Título", width: 300, editable: false },
  { field: "date", headerName: "Fecha", width: 150 },
  { field: "size", headerName: "Tamaño", width: 90 },
];

export const columnsCategories: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 300, editable: true },
  { field: "section", headerName: "seccion", width: 150, editable: true },
];
