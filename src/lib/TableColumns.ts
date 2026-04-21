import { GridColDef } from "@mui/x-data-grid";

const colTitle: GridColDef = {
  field: "title",
  headerName: "Nombre de archivo",
  width: 300,
  editable: false,
};

const colType: GridColDef = {
  field: "type",
  headerName: "Tipo de archivo",
  width: 130,
};

const colSize: GridColDef = {
  field: "size",
  headerName: "Tamaño",
  width: 90,
};

const colDate: GridColDef = {
  field: "date",
  headerName: "Fecha de creación",
  width: 160,
};

/** Para páginas públicas: sin columna de fecha */
export const columnsFilePublic: GridColDef[] = [colTitle, colType, colSize];

/** Para el panel de administración: con fecha y título editable */
export const columnsFilePanel: GridColDef[] = [
  { ...colTitle, editable: true },
  colType,
  colSize,
  colDate,
];

export const columnsCategories: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 300, editable: true },
  {
    field: "section",
    headerName: "Sección",
    width: 160,
    editable: true,
    type: "singleSelect",
    valueOptions: ["HOME", "TRANSPARENCIA"],
  },
];
