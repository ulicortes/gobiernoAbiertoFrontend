'use client';

import { useState } from 'react';
import PanelSidebar from '@/components/PanelSidebar';
import DataTable from '@/components/DataTable';
import { getTableDataForCategory } from '@/lib/tableData';
import UploadForm from '@/components/UploadForm';
import PanelHeader from '@/components/PanelHeader';
import AddCategoryForm from '@/components/AddCategoryForm';
import UploadFileButton from '@/components/UploadFileButton';
// import LoginMenu from '@/components/LoginMenu';

type ContentView = 'none' | 'dataTable' | 'uploadForm';

export default function PanelPage() {
  const [contentView, setContentView] = useState<ContentView>('dataTable');
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Informes de gestión');
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<string | null>(null);

  // let[user, setUser] = useState(null);
  // useEffect(() => {
  //   const savedData = localStorage.getItem('userData');
  //   const user = savedData ? JSON.parse(savedData) : null;
  //   setUser(user);
  // }, [])
  // if(!user) return <LoginMenu />

  const showDataTable = (category: string) => {
    setContentView('dataTable');
    setSelectedCategory(category);
  };

  const handleFileSelect = (selected: File) => {
    setUploadFile(selected);
    setUploadCategory(selectedCategory);
    setContentView('uploadForm');
    setSelectedCategory(null);
  };

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
          {contentView === 'dataTable' && selectedCategory !== 'Editar categorías' && (
            <UploadFileButton onFileSelect={handleFileSelect} />
          )}

          {contentView === 'dataTable' && selectedCategory === 'Editar categorías' && (
            <AddCategoryForm />
          )}

          <div className="w-full min-h-[400px]">
            {contentView === 'dataTable' && <DataTable rows={rows} columns={columns} showActions />}
            {contentView === 'uploadForm' && <UploadForm initialFile={uploadFile} initialCategory={uploadCategory} />}
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
