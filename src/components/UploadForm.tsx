'use client';

import { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import { HOME_CATEGORIES, TRANSPARENCIA_CATEGORIES } from './PanelSidebar';

type UploadFormProps = {
  initialFile?: File | null;
  initialCategory?: string | null;
};

export default function UploadForm({ initialFile, initialCategory }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form fields
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('');
  const [quarter, setQuarter] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const handleFile = (selected: File) => {
    setFile(selected);
    setFileName(selected.name);
  };

  useEffect(() => {
    if (initialFile) handleFile(initialFile);
  }, [initialFile]);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
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
    if (selected) handleFile(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    // Aquí se puede integrar la subida real (API, etc.)
    console.log('Subir archivo:', file.name);
    console.log({ fileName, category, quarter, year });
    alert(`Archivo seleccionado: ${file.name}. Categoria: ${category}. Integrar con tu API de subida.`);
  };

  const allCategories = [...HOME_CATEGORIES, ...TRANSPARENCIA_CATEGORIES];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-black-base mb-4">Subir archivo</h2>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-4 ${
          dragActive ? 'border-blue-base bg-blue-50' : 'border-gray-300 hover:border-gray-400'
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
            Arrastrá un archivo aquí o <span className="text-blue-base font-medium">elegí desde tu equipo</span>
          </span>
        </label>
        {file && (
          <Typography sx={{ mt: 2, fontSize: '0.9rem', color: 'var(--color-black-base)' }}>
            Archivo actualmente seleccionado: <strong>{file.name}</strong>
          </Typography>
        )}
      </div>

      {file && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 2 }}>
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
            {allCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {category === 'Reportes económicos' && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Trimestre"
                select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </TextField>
              
              <TextField
                label="Año"
                type="text"
                value={year}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setYear(val);
                  }
                }}
                fullWidth
                required
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={!file || !fileName || !category || (category === 'Reportes económicos' && (!quarter || !year))}
            sx={{
              mt: 1,
              py: 1.5,
              backgroundColor: 'var(--color-blue-base)',
              '&:hover': { backgroundColor: 'var(--color-blue-dark)' },
              '&.Mui-disabled': { backgroundColor: '#c0c0c0', color: '#666' }
            }}
          >
            Subir
          </Button>
        </Box>
      )}
    </form>
  );
}
