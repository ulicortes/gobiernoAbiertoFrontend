'use client';

import { useState } from 'react';
import PanelSidebar from '@/components/PanelSidebar';
import DataTable from '@/components/DataTable';
import { getTableDataForCategory } from '@/lib/tableData';
import UploadForm from '@/components/UploadForm';
import PanelHeader from '@/components/PanelHeader';

type ContentView = 'none' | 'dataTable' | 'uploadForm';

export default function PanelPage() {
  const [contentView, setContentView] = useState<ContentView>('none');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const showDataTable = (category: string) => {
    setContentView('dataTable');
    setSelectedCategory(category);
  };
  const showUploadForm = () => setContentView('uploadForm');

  const { rows, columns } = getTableDataForCategory(selectedCategory);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header del panel */}
      <PanelHeader />

      {/* Contenido principal: sidebar + área derecha */}
      <div className="w-full flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 flex-shrink-0 p-4 md:p-6">
          <PanelSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={showDataTable}
            onEditarCategorias={() => showDataTable('Editar categorías')}
          />
        </div>

        <section className="flex-1 bg-white p-4 md:p-6 min-h-[50vh]">
          <div className="mb-4">
            <button
              type="button"
              onClick={showUploadForm}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black-base font-medium transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Subir archivo
            </button>
          </div>

          <div className="w-full min-h-[400px]">
            {contentView === 'dataTable' && <DataTable rows={rows} columns={columns} />}
            {contentView === 'uploadForm' && <UploadForm />}
            {contentView === 'none' && (
              <div className="flex items-center justify-center min-h-[400px] text-gray-500">
                Seleccioná una categoría, Editar categorías o Subir archivo para ver el contenido.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
