'use client';

import { useState } from 'react';

const HOME_CATEGORIES = [
  'Informes de gestión',
  'Guía de usuario',
];

const TRANSPARENCIA_CATEGORIES = [
  'Haberes de empleados',
  'Recibos de funcionarios',
  'Declaraciones juradas',
  'Nómina del personal',
  'Reportes económicos',
];

type PanelSidebarProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  onEditarCategorias: () => void;
};

export default function PanelSidebar({ selectedCategory, onSelectCategory, onEditarCategorias }: PanelSidebarProps) {
  const [homeOpen, setHomeOpen] = useState(true);
  const [transparenciaOpen, setTransparenciaOpen] = useState(true);

  return (
    <aside className="h-full w-full min-h-[60vh] bg-gray-200 rounded-xl flex flex-col py-4 px-4">
      {/* HOME */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setHomeOpen(!homeOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          HOME
          <svg
            className={`w-5 h-5 transition-transform ${homeOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {homeOpen && (
          <div className="flex flex-col pl-2 mt-1">
            {HOME_CATEGORIES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectCategory(label)}
                className={`text-left py-2 px-2 rounded hover:bg-gray-300 ${selectedCategory === label ? 'text-blue-base font-medium' : 'text-black-base'}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TRANSPARENCIA */}
      <div className="flex flex-col mt-2">
        <button
          type="button"
          onClick={() => setTransparenciaOpen(!transparenciaOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          TRANSPARENCIA
          <svg
            className={`w-5 h-5 transition-transform ${transparenciaOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {transparenciaOpen && (
          <div className="flex flex-col pl-2 mt-1">
            {TRANSPARENCIA_CATEGORIES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectCategory(label)}
                className={`text-left py-2 px-2 rounded hover:bg-gray-300 ${selectedCategory === label ? 'text-blue-base font-medium' : 'text-black-base'}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editar categorías - al fondo */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={onEditarCategorias}
          className={`flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-gray-300 font-medium ${selectedCategory === 'Editar categorías' ? 'text-blue-base' : 'text-black-base'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Editar categorías
        </button>
      </div>
    </aside>
  );
}
