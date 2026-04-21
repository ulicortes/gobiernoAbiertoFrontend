"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { servicio } from "@/services/service";

interface Cat {
  id: number;
  name: string;
  section: string;
}

type UploadFileFormProps = {
  initialFile?: File | null;
  initialCategory?: string | null;
};

export default function UploadFileForm({
  initialFile,
  initialCategory,
}: UploadFileFormProps) {
  const [file, setFile] = useState<File | null>(initialFile || null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileName, setFileName] = useState(initialFile?.name || "");
  const [category, setCategory] = useState("");
  const [trimester, setTrimester] = useState("");
  const [year, setYear] = useState("");
  const [isAnnualBudget, setIsAnnualBudget] = useState(false);
  const [allCategories, setAllCategories] = useState<Cat[]>([]);

  useEffect(() => {
    servicio
      .getCategorias()
      .then((res) => setAllCategories(res || []))
      .catch(console.error);
  }, []);

  const handleFile = (selected: File) => {
    setFile(selected);
    setFileName(selected.name);
    setErrorMessage("");
  };

  const selectedCategoryName =
    allCategories.find((c) => String(c.id) === String(category))?.name ?? "";
  const isEconomicReports = selectedCategoryName === "Reportes económicos";
  const isManagementReports = selectedCategoryName === "Informes de gestión";
  const shouldShowYear = isEconomicReports || isManagementReports;

  useEffect(() => {
    if (!isEconomicReports) {
      setIsAnnualBudget(false);
    }
  }, [isEconomicReports]);

  useEffect(() => {
    if (initialCategory && allCategories.length > 0) {
      const match = allCategories.find((c) => c.name === initialCategory);
      if (match) setCategory(String(match.id));
    }
  }, [initialCategory, allCategories]);

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
    setMessage("");
    setErrorMessage("");
    if (selected) handleFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setErrorMessage("");
    try {
      const res = await servicio.insertArchivo(
        file,
        category,
        fileName,
        isEconomicReports ? (isAnnualBudget ? "null" : trimester) : undefined,
        shouldShowYear ? parseInt(year, 10) : undefined,
        isEconomicReports ? isAnnualBudget : undefined,
      );
      if (res) {
        setMessage("¡Se agregó el archivo exitosamente!");
        setFile(null);
        setTrimester("");
        setYear("");
        setIsAnnualBudget(false);
      }
    } catch (error: unknown) {
      const ax = error as {
        response?: { status?: number; data?: { message?: string | string[] } };
      };
      const backendMessage = ax.response?.data?.message;
      const parsedMessage = Array.isArray(backendMessage)
        ? backendMessage.join(" ")
        : backendMessage;

      if (ax.response?.status === 409) {
        setErrorMessage(
          parsedMessage ||
            "Ya existe un presupuesto anual para ese año. Elegí otro año o editá el existente.",
        );
        return;
      }

      setErrorMessage(parsedMessage || "No se pudo subir el archivo. Intentá nuevamente.");
    }
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
      {message !== "" && (
        <h1 className="text-black text-xl w-full text-center">{message}</h1>
      )}
      {errorMessage !== "" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
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

          {(isEconomicReports || isManagementReports) && (
            <>
              {isEconomicReports && (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAnnualBudget}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setIsAnnualBudget(checked);
                          if (checked) setTrimester("");
                        }}
                      />
                    }
                    label="¿Este archivo es un presupuesto anual?"
                  />
                  {!isAnnualBudget && (
                    <TextField
                      select
                      label="Trimestre"
                      value={trimester}
                      onChange={(e) => setTrimester(e.target.value)}
                      fullWidth
                      required
                    >
                      <MenuItem value="Primer trimestre">Primer trimestre</MenuItem>
                      <MenuItem value="Segundo trimestre">Segundo trimestre</MenuItem>
                      <MenuItem value="Tercer trimestre">Tercer trimestre</MenuItem>
                      <MenuItem value="Cuarto trimestre">Cuarto trimestre</MenuItem>
                    </TextField>
                  )}
                </>
              )}

              <TextField
                label="Año"
                placeholder="Año"
                value={year}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    if (val.length <= 4) setYear(val);
                  }
                }}
                fullWidth
                required
                error={year.length > 0 && year.length < 4}
                helperText={year.length > 0 && year.length < 4 ? "El año debe tener 4 dígitos" : ""}
              />
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={
              !file ||
              !fileName ||
              !category ||
              (isEconomicReports && ((!isAnnualBudget && !trimester) || !year || year.length < 4)) ||
              (isManagementReports && (!year || year.length < 4))
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
