'use client'
import { servicio } from "@/services/service";
import DataTable from "@/components/ui/DataTable";
import { columnsFilePublic } from "@/lib/TableColumns";
import { useEffect, useState, use } from "react";
import { ElementoTabla } from "@/types/elemento";
import Historial from "@/components/public/Historial";
import { resolveFileType } from "@/lib/fileUtils";

export default function DynamicCategoryPage({ params }: { params: Promise<{ categoryName: string }> }) {
  const resolvedParams = use(params);
  const categoryName = decodeURIComponent(resolvedParams.categoryName);
  const [rows, setRows] = useState<ElementoTabla[]>([]);
  const [rawFiles, setRawFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const displayName = categoryName.replace(/-/g, ' ');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resultado: any[] = await servicio.getArchivosDeUnaCategoria(categoryName);
        if (resultado) {
          setRawFiles(resultado);
          const mappedRows = resultado.map((file: any) => ({
            id: file.id,
            title: file.title || file.name,
            date: file.date
              ? new Date(file.date).toLocaleDateString()
              : new Date(file.createdAt || new Date()).toLocaleDateString(),
            size: file.size
              ? (file.size / 1024 / 1024).toFixed(2) + " MB"
              : "N/A",
            type: resolveFileType(file.type, file.filePath),
            filePath: file.filePath,
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

  const isEconomicReports =
    categoryName.toLowerCase() === "reportes-economicos" ||
    categoryName === "Reportes económicos";

  const filesByYear = isEconomicReports
    ? rawFiles.reduce((acc, file) => {
        const anio = file.year || new Date(file.createdAt || file.date || new Date()).getFullYear();
        if (!acc[anio]) acc[anio] = [];
        acc[anio].push(file);
        return acc;
      }, {} as Record<number, any[]>)
    : {};

  const sortedYears = Object.keys(filesByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="animate-fade">
      {loading ? (
        <p className="mt-20 text-gray-500 px-2">Cargando documentos...</p>
      ) : rows.length === 0 ? (
        <p className="mt-20 text-gray-500 text-lg px-2">
          No hay documentos cargados en esta categoría.
        </p>
      ) : isEconomicReports ? (
        <div className="flex flex-col items-center mt-4 gap-4">
          {sortedYears.map((year) => (
            <Historial key={year} anio={year} archivos={filesByYear[year]} />
          ))}
        </div>
      ) : (
        <DataTable
          rows={rows}
          columns={columnsFilePublic}
          height={650}
          showActions
          showDownloadAction
        />
      )}
    </div>
  );
}
