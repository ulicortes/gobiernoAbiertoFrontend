'use client';

import { useRef } from 'react';

type UploadFileButtonProps = {
  onFileSelect: (file: File) => void;
};

export default function UploadFileButton({ onFileSelect }: UploadFileButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubirArchivoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileSelect(selected);
    }
    // Resetear el valor permite que el explorador dispare onChange si se vuelve a subir el mismo archivo
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
      />
      <button
        type="button"
        onClick={handleSubirArchivoClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black-base font-medium transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Subir archivo
      </button>
    </div>
  );
}
