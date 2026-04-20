"use client";

import { use, useEffect, useState } from "react";
import { servicio } from "@/services/service";
import { toSlug } from "@/lib/slugify";
import DataTable from "@/components/ui/DataTable";
import UploadFileButton from "@/components/ui/UploadFileButton";
import UploadFileForm from "@/components/forms/UploadFileForm";
import { columnsFilePanel, columnsCategories } from "@/lib/TableColumns";
import { GridColDef } from "@mui/x-data-grid";
import { ElementoTabla } from "@/types/elemento";

interface Cat {
  id: number;
  name: string;
  section: string;
}

function resolveFileType(type: string | undefined, filePath: string | undefined): string {
  const typeLabels: Record<string, string> = {
    pdf: "PDF",
    image: "Imagen",
    doc: "Documento",
    other: "Otro",
  };
  if (type && typeLabels[type]) return typeLabels[type];
  const ext = filePath?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext && ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "Imagen";
  if (ext && ["doc", "docx"].includes(ext)) return "Documento";
  if (ext && ["xls", "xlsx", "csv"].includes(ext)) return "Planilla";
  return "Otro";
}

function mapFileToRow(f: any): ElementoTabla {
  return {
    id: f.id,
    title: f.title || f.name,
    date: new Date(f.date || f.createdAt || new Date()).toLocaleDateString(),
    size: f.size ? (f.size / 1024 / 1024).toFixed(2) + " MB" : "N/A",
    type: resolveFileType(f.type, f.filePath),
    trimester: f.trimester || "-",
    year: f.year || "-",
  };
}

export default function ArchivosCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = use(params);

  const [rows, setRows] = useState<ElementoTabla[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    servicio
      .getCategorias()
      .then((cats: Cat[]) => {
        const match = (cats || []).find((c) => toSlug(c.name) === categorySlug);
        setCategoryName(match?.name ?? null);
      })
      .catch(console.error);
  }, [categorySlug]);

  async function fetchRows() {
    setLoading(true);
    try {
      const res = await servicio.getArchivosDeUnaCategoria(categorySlug);
      setRows(res ? res.map(mapFileToRow) : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRows();
  }, [categorySlug]);

  const isEconomic = categorySlug === toSlug("Reportes económicos");

  const columns: GridColDef[] = isEconomic
    ? [
        { field: "title", headerName: "Nombre de archivo", width: 300, editable: true },
        { field: "trimester", headerName: "Trimestre", width: 150, editable: true },
        { field: "year", headerName: "Año", width: 100, editable: true },
        ...columnsFilePanel.filter((c) => c.field !== "title"),
      ]
    : columnsFilePanel;

  const handleRowUpdate = async (newRow: any) => {
    try {
      await servicio.editarArchivo(
        newRow.id,
        newRow.title,
        isEconomic ? newRow.trimester : undefined,
        isEconomic ? newRow.year : undefined,
      );
      return newRow;
    } catch (e) {
      console.error(e);
      return newRow;
    }
  };

  const handleFileDelete = async (id: any) => {
    try {
      await servicio.borrarArchivo(id);
      fetchRows();
    } catch (e) {
      console.error(e);
    }
  };

  if (uploadFile) {
    return (
      <UploadFileForm
        initialFile={uploadFile}
        initialCategory={categoryName}
        key={categorySlug}
      />
    );
  }

  return (
    <div className="w-full">
      <UploadFileButton
        onFileSelect={(file) => setUploadFile(file)}
      />
      {loading ? (
        <div className="py-8 text-gray-500">Cargando...</div>
      ) : (
        <DataTable
          rows={rows}
          columns={columns}
          showActions
          onRowUpdate={handleRowUpdate}
          onRowDelete={handleFileDelete}
        />
      )}
    </div>
  );
}
