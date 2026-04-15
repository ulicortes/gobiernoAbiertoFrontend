"use client";

import { useState, useEffect } from "react";
import PanelSidebar, {
  TRANSPARENCIA_CATEGORIES,
} from "@/components/PanelSidebar";
import DataTable from "@/components/DataTable";
import UploadForm from "@/components/UploadForm";
import PanelHeader from "@/components/PanelHeader";
import AddCategoryForm from "@/components/AddCategoryForm";
import UploadFileButton from "@/components/UploadFileButton";
import { AuthProvider } from "@/components/AuthProvider";
import { columnsFile, columnsCategories } from "@/lib/TableColumns";
import { GridColDef } from "@mui/x-data-grid";
import { servicio } from "@/services/service";

import { ElementoTabla } from "@/types/elemento";

type ContentView = "none" | "dataTable" | "uploadForm";

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

  async function showDataTable(category: string) {
    try {
      setLoading(true);
      setContentView("dataTable");
      
      await servicio.getArchivosDeUnaCategoria(category).then((r) => {
        if(r) {
          const data = r.map((f: any) => ({
             id: f.id,
             title: f.title,
             date: new Date(f.date).toLocaleDateString(),
             size: f.size ? (f.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'
          }));
          setRows(data);
        } else {
          setRows([]);
        }
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
      if(res) {
        setRows(res.map((f: any) => ({
             id: f.id,
             title: f.title,
             date: new Date(f.date).toLocaleDateString(),
             size: f.size ? (f.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'
        })));
      } else {
        setRows([]);
      }
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
      await servicio.editarArchivo(newRow.id, newRow.title);
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

  const columns: GridColDef[] = columnsFile.map((c) => 
    c.field === "title" ? { ...c, editable: true } : c
  );
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
              onSelectCategory={showDataTable}
              onEditarCategorias={() => showDataTable("Editar categorías")}
            />
          </div>

          <section className="flex-1 bg-white p-4 md:p-6 min-h-[50vh]">
            {contentView === "dataTable" &&
              selectedCategory !== "Editar categorías" && (
                <UploadFileButton onFileSelect={handleFileSelect} />
              )}

            {contentView === "dataTable" &&
              selectedCategory === "Editar categorías" && (
                <AddCategoryForm enviarAlPadre={setMessage} />
              )}

            <div className="w-full min-h-[400px]">
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
                <UploadForm
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
