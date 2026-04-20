"use client";

import { useState, useEffect } from "react";
import PanelSidebar, {
  TRANSPARENCIA_CATEGORIES,
} from "@/components/ui/PanelSidebar";
import DataTable from "@/components/ui/DataTable";
import UploadFileForm from "@/components/forms/UploadFileForm";
import PanelHeader from "@/components/layout/PanelHeader";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import UploadFileButton from "@/components/ui/UploadFileButton";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { columnsFilePanel, columnsCategories } from "@/lib/TableColumns";
import { GridColDef } from "@mui/x-data-grid";
import { servicio } from "@/services/service";

import { ElementoTabla } from "@/types/elemento";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import UserManagementPanel from "@/components/forms/UserManagementPanel";
import {
  PANEL_SECTION_PASSWORD,
  PANEL_SECTION_USERS,
  isPanelSyntheticCategory,
} from "@/lib/panelSections";

type ContentView = "none" | "dataTable" | "uploadForm" | "password" | "users";

interface row_cat {
  name: string;
  section: string;
}

export default function PanelPage() {
  const [contentView, setContentView] = useState<ContentView>("dataTable");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Informes de gestión",
  );

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<string | null>(null);
  const [rows, setRows] = useState<ElementoTabla[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rowsCat, setRowsCat] = useState<any[]>([]);

  async function cargarCategorias() {
    try {
      const r = await servicio.getCategorias();
      setRowsCat(r || []);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (selectedCategory === "Editar categorías") {
      cargarCategorias();
    }
  }, [message, selectedCategory]);

  function handleSidebarSelect(label: string) {
    if (label === PANEL_SECTION_PASSWORD) {
      setSelectedCategory(PANEL_SECTION_PASSWORD);
      setContentView("password");
      return;
    }
    if (label === PANEL_SECTION_USERS) {
      setSelectedCategory(PANEL_SECTION_USERS);
      setContentView("users");
      return;
    }
    void showDataTable(label);
  }

  function resolveFileType(type: string | undefined, filePath: string | undefined): string {
    const typeLabels: Record<string, string> = {
      pdf: "PDF",
      image: "Imagen",
      doc: "Documento",
      other: "Otro",
    };
    if (type && typeLabels[type]) return typeLabels[type];
    // fallback: derivar desde la extensión del filePath
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

  async function showDataTable(category: string) {
    try {
      setLoading(true);
      setContentView("dataTable");
      
      await servicio.getArchivosDeUnaCategoria(category).then((r) => {
        setRows(r ? r.map(mapFileToRow) : []);
        setSelectedCategory(category);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [selectedCategory, rows]);

  async function getRows() {
    try {
      const res = await servicio.getArchivosDeUnaCategoria(selectedCategory || "");
      setRows(res ? res.map(mapFileToRow) : []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleFileSelect = (selected: File) => {
    setUploadFile(selected);
    setUploadCategory(selectedCategory);
    setContentView("uploadForm");
    setSelectedCategory(null);
  };

  const handleRowUpdate = async (newRow: any) => {
    try {
      const isEconomic = selectedCategory === "Reportes económicos";
      await servicio.editarArchivo(
        newRow.id,
        newRow.title,
        isEconomic ? newRow.trimester : undefined,
        isEconomic ? newRow.year : undefined,
      );
      return newRow;
    } catch (e) {
      console.log(e);
      return newRow;
    }
  };

  const handleFileDelete = async (id: any) => {
    try {
      await servicio.borrarArchivo(id);
      getRows();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCategoryUpdate = async (newRow: any) => {
    try {
      await servicio.editarCategoria(newRow.id, { name: newRow.name, section: newRow.section });
      cargarCategorias();
      return newRow;
    } catch (e) {
      console.log(e);
      return newRow;
    }
  };

  const handleCategoryDelete = async (id: any) => {
    try {
      await servicio.borrarCategoria(id);
      cargarCategorias();
    } catch (e) {
      console.log(e);
    }
  };

  const columns: GridColDef[] =
    selectedCategory === "Reportes económicos"
      ? [
          { field: "title", headerName: "Nombre de archivo", width: 300, editable: true },
          { field: "trimester", headerName: "Trimestre", width: 150, editable: true },
          { field: "year", headerName: "Año", width: 100, editable: true },
          ...columnsFilePanel.filter(
            (c) => c.field !== "title",
          ),
        ]
      : columnsFilePanel;

  const cat_columns: GridColDef[] = columnsCategories;

  return (
    <AuthProvider>
      <div className="w-full min-h-full flex flex-col">
        {/* Header del panel */}
        <PanelHeader />

        <div className="w-full flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 shrink-0 p-4 md:p-6">
            <PanelSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSidebarSelect}
              onEditarCategorias={() => showDataTable("Editar categorías")}
            />
          </div>

          <section className="flex-1 bg-white p-4 md:p-6 min-h-[50vh]">
            {contentView === "dataTable" &&
              selectedCategory !== "Editar categorías" &&
              !isPanelSyntheticCategory(selectedCategory) && (
                <UploadFileButton onFileSelect={handleFileSelect} />
              )}

            {contentView === "dataTable" &&
              selectedCategory === "Editar categorías" && (
                <AddCategoryForm enviarAlPadre={setMessage} />
              )}

            <div className="w-full min-h-[400px]">
              {contentView === "password" && <ChangePasswordForm />}
              {contentView === "users" && <UserManagementPanel />}
              {contentView === "dataTable" &&
                selectedCategory === "Editar categorías" && (
                  <div>
                    <DataTable
                      rows={rowsCat}
                      columns={cat_columns}
                      showActions
                      onRowUpdate={handleCategoryUpdate}
                      onRowDelete={handleCategoryDelete}
                    />
                  </div>
                )}
              {contentView === "dataTable" && loading && <div>Cargando...</div>}
              {contentView === "dataTable" &&
                selectedCategory !== "Editar categorías" &&
                !loading && (
                  <DataTable
                    rows={rows}
                    columns={columns}
                    showActions
                    onRowUpdate={handleRowUpdate}
                    onRowDelete={handleFileDelete}
                  />
                )}
              {contentView === "uploadForm" && (
                <UploadFileForm
                  initialFile={uploadFile}
                  initialCategory={uploadCategory}
                  key={uploadCategory || 0}
                />
              )}
              {contentView === "none" && (
                <div className="flex items-center justify-center min-h-[400px] text-gray-500">
                  Seleccioná una categoría, Editar categorías o Subir archivo
                  para ver el contenido.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Contenido principal: sidebar + área derecha */}
      </div>
    </AuthProvider>
  );
}
