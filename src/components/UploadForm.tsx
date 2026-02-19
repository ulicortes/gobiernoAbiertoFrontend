'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

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
    if (droppedFile) setFile(droppedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    // Aquí se puede integrar la subida real (API, etc.)
    console.log('Subir archivo:', file.name);
    alert(`Archivo seleccionado: ${file.name}. Integrar con tu API de subida.`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-black-base mb-4">Subir archivo</h2>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
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
          <p className="mt-3 text-sm text-black-base font-medium">
            Archivo: {file.name}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!file}
        className="mt-4 w-full py-2 px-4 bg-blue-base text-white font-medium rounded-lg hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir
      </button>
    </form>
  );
}
