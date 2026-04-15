'use client'
import { servicio } from "@/services/service";
import DataTable from "@/components/ui/DataTable";
import { columnsFile } from "@/lib/TableColumns";
import { useEffect, useState, use } from "react";
import { ElementoTabla } from "@/types/elemento";

export default function DynamicCategoryPage({ params }: { params: Promise<{ categoryName: string }> }) {
  const resolvedParams = use(params);
  const categoryName = decodeURIComponent(resolvedParams.categoryName);
  const [rows, setRows] = useState<ElementoTabla[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resultado: any[] = await servicio.getArchivosDeUnaCategoria(categoryName);
        if (resultado) {
          // Map backend data to table columns expected format (title, date, size)
          // Keep the ID for DataGrid's internal mapping.
          const mappedRows = resultado.map(file => ({
             id: file.id,
             title: file.title,
             date: new Date(file.date).toLocaleDateString(),
             size: file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'
          }));
          setRows(mappedRows);
        }
      } catch (error) {
        console.error("Error obteniendo archivos de categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [categoryName]);

  return (
    <div className="w-full md:w-3/5 h-[80vh] flex flex-col animate-fade items-center">
        {loading ? (
           <p className="mt-20 text-gray-500">Cargando documentos...</p>
        ) : rows.length === 0 ? (
           <p className="mt-20 text-gray-500 text-lg">No hay documentos cargados en esta categoría.</p>
        ) : (
           <DataTable rows={rows} columns={columnsFile} />
        )}
    </div>
  );
}
