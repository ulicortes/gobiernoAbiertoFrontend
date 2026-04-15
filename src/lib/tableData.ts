import { GridColDef } from '@mui/x-data-grid';
import { HOME_CATEGORIES, TRANSPARENCIA_CATEGORIES } from '@/components/PanelSidebar';

export const getTableDataForCategory = (selectedCategory: string | null) => {
  if (selectedCategory === 'Editar categorías') {
    let idCounter = 1;
    const rows = [
      ...HOME_CATEGORIES.map(cat => ({ id: idCounter++, nombre: cat, seccion: 'HOME' })),
      ...TRANSPARENCIA_CATEGORIES.map(cat => ({ id: idCounter++, nombre: cat, seccion: 'TRANSPARENCIA' }))
    ];
    
    const columns: GridColDef[] = [
      { field: 'nombre', headerName: 'Nombre de la Categoría', width: 300, editable: true },
      { field: 'seccion', headerName: 'Sección', width: 200 },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Informes de gestión') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 300, editable: true },
      { field: 'date', headerName: 'Fecha', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Informe de gestión 2022`, date: '2023-10-01' },
      { id: 2, title: `Informe de gestión 2023`, date: '2023-10-05' },
      { id: 3, title: `Informe de gestión 2024`, date: '2023-12-05' },
      { id: 4, title: `Informe de gestión 2025`, date: '2023-15-05' },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Haberes de empleados') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 300, editable: true },
      { field: 'date', headerName: 'Fecha', width: 150 },
      { field: 'size', headerName: 'Tamaño', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Haberes Enero 2025`, date: '2023-10-01', size: '10MB' },
      { id: 2, title: `Haberes Febrero 2025`, date: '2023-10-05', size: '12MB' },
      { id: 3, title: `Haberes Marzo 2025`, date: '2023-12-05', size: '15MB' },
      { id: 4, title: `Haberes Abril 2025`, date: '2023-15-05', size: '18MB' },
      { id: 5, title: `Haberes Mayo 2025`, date: '2023-15-05', size: '18MB' },
      { id: 6, title: `Haberes Junio 2025`, date: '2023-15-05', size: '18MB' },
      { id: 7, title: `Haberes Julio 2025`, date: '2023-15-05', size: '18MB' },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Recibos de funcionarios') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 300, editable: true },
      { field: 'date', headerName: 'Fecha', width: 150 },
      { field: 'size', headerName: 'Tamaño', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Intendente`, date: '2023-10-01', size: '10MB' },
      { id: 2, title: `Secretario de Gobierno`, date: '2023-10-05', size: '12MB' },
      { id: 3, title: `Secretario de Hacienda`, date: '2023-12-05', size: '15MB' },
      { id: 4, title: `Secretario de Obras Públicas`, date: '2023-15-05', size: '18MB' },
      { id: 5, title: `Secretario de Desarrollo Social`, date: '2023-15-05', size: '18MB' },
      { id: 6, title: `Secretario de Cultura y Turismo`, date: '2023-15-05', size: '18MB' },
      { id: 7, title: `Secretario de Desarrollo Económico`, date: '2023-15-05', size: '18MB' },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Declaraciones juradas') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 300, editable: true },
      { field: 'date', headerName: 'Fecha', width: 150 },
      { field: 'size', headerName: 'Tamaño', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Intendente`, date: '2023-10-01', size: '10MB' },
      { id: 2, title: `Secretario de Obras y Servicios Públicos`, date: '2023-10-05', size: '12MB' },
      { id: 3, title: `Secretario de Hacienda`, date: '2023-12-05', size: '15MB' },
      { id: 4, title: `Secretario de Obras Públicas`, date: '2023-15-05', size: '18MB' },
      { id: 5, title: `Secretario de Desarrollo Social`, date: '2023-15-05', size: '18MB' },
      { id: 6, title: `Secretario de Cultura y Turismo`, date: '2023-15-05', size: '18MB' },
      { id: 7, title: `Secretario de Desarrollo Económico`, date: '2023-15-05', size: '18MB' },
      { id: 8, title: `Titular OMIC`, date: '2023-10-01', size: '10MB' },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Nómina del personal') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 300, editable: true },
      { field: 'date', headerName: 'Fecha', width: 150 },
      { field: 'size', headerName: 'Tamaño', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Intendente`, date: '2023-10-01', size: '10MB' },
      { id: 2, title: `Secretario de Obras y Servicios Públicos`, date: '2023-10-05', size: '12MB' },
      { id: 3, title: `Secretario de Hacienda`, date: '2023-12-05', size: '15MB' },
      { id: 4, title: `Secretario de Obras Públicas`, date: '2023-15-05', size: '18MB' },
      { id: 5, title: `Secretario de Desarrollo Social`, date: '2023-15-05', size: '18MB' },
      { id: 6, title: `Secretario de Cultura y Turismo`, date: '2023-15-05', size: '18MB' },
      { id: 7, title: `Secretario de Desarrollo Económico`, date: '2023-15-05', size: '18MB' },
      { id: 8, title: `Titular OMIC`, date: '2023-10-01', size: '10MB' },
    ];
    
    return { rows, columns };
  }

  if (selectedCategory === 'Reportes económicos') {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Título', width: 400, editable: true },
      { field: 'trimestre', headerName: 'Trimestre', width: 150 },
      { field: 'year', headerName: 'Año', width: 150 },
      { field: 'size', headerName: 'Tamaño', width: 90 },
    ];
    
    const rows = [
      { id: 1, title: `Situación económica financiera al 31/03/2025`, trimestre: '1', year: '2023', size: '10MB' },
      { id: 2, title: `Disponibilidades al 31/03/2025`, trimestre: '2', year: '2023', size: '12MB' },
      { id: 3, title: `Registro de endeudamiento municipal al 31/03/2025`, trimestre: '3', year: '2023', size: '15MB' },
      { id: 4, title: `Situación económica financiera al 30/06/2025`, trimestre: '4', year: '2023', size: '18MB' },
      { id: 5, title: `Disponibilidades al 30/06/2025`, trimestre: '1', year: '2024', size: '18MB' },
      { id: 6, title: `Registro de endeudamiento municipal al 30/06/2025`, trimestre: '2', year: '2024', size: '18MB' },
    ];
    
    return { rows, columns };
  }

  // Default empty state
  return { rows: [], columns: [] };
};
