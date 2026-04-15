"use client";

import { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";
import { HOME_CATEGORIES, TRANSPARENCIA_CATEGORIES } from "./PanelSidebar";
import { servicio } from "@/services/service";

type UploadFormProps = {
  initialFile?: File | null;
  initialCategory?: string | null;
};

export default function UploadForm({
  initialFile,
  initialCategory,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(initialFile || null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<String>('');
  const [fileName, setFileName] = useState(initialFile?.name || "");
  const [category, setCategory] = useState("");

  const handleFile = (selected: File) => {
    setFile(selected);
    setFileName(selected.name);
  };

  const allCategories = [...TRANSPARENCIA_CATEGORIES];

  useEffect(() => {
    if (initialCategory) {
      const match = allCategories.find((c) => c.name === initialCategory);
      if (match) setCategory(String(match.id));
    }
  }, [initialCategory]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setMessage('');
    if (selected) handleFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    try {
      const res = await servicio.insertArchivo(file, category, fileName);
      if(res) { 
        setMessage('Se agrego el archivo exitosamente!');
        setFile(null);
      }
    } catch (error) {
      throw Error();
    }
    // Aquí se puede integrar la subida real (API, etc.)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      <h2 className="text-xl font-bold text-black-base mb-4">Subir archivo</h2>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-4 ${
          dragActive
            ? "border-blue-base bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <span className="text-gray-600">
            Arrastrá un archivo aquí o{" "}
            <span className="text-blue-base font-medium">
              elegí desde tu equipo
            </span>
          </span>
        </label>
        {file && (
          <Typography
            sx={{ mt: 2, fontSize: "0.9rem", color: "var(--color-black-base)" }}
          >
            Archivo actualmente seleccionado: <strong>{file.name}</strong>
          </Typography>
        )}
      </div>
      {message !== '' && (
      <h1 className="text-black text-xl w-full text-center">{message}</h1>
	)}
      {file && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 2 }}>
          <TextField
            label="Nombre del archivo"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Categoría del archivo"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            required
          >
            {allCategories.map((cat, index) => (
              <MenuItem key={index} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            disabled={
              !file ||
              !fileName ||
              !category
            }
            sx={{
              mt: 1,
              py: 1.5,
              backgroundColor: "var(--color-blue-base)",
              "&:hover": { backgroundColor: "var(--color-blue-dark)" },
              "&.Mui-disabled": { backgroundColor: "#c0c0c0", color: "#666" },
            }}
          >
            Subir
          </Button>
        </Box>
      )}
    </form>
  );
}
