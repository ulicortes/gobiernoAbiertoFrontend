"use client";

import { servicio } from "@/services/service";
import { useState, useEffect } from "react";

export const HOME_CATEGORIES = ["Informes de gestión", "Guía de usuario"];
// {"id":1,"name":"haberes"}
interface cat {
  id: number;
  name: string;
  section: string;
}
export let TRANSPARENCIA_CATEGORIES: cat[];

type PanelSidebarProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  onEditarCategorias: () => void;
};

export default function PanelSidebar({
  selectedCategory,
  onSelectCategory,
  onEditarCategorias,
}: PanelSidebarProps) {
  const [homeOpen, setHomeOpen] = useState(true);
  const [transparenciaOpen, setTransparenciaOpen] = useState(true);
  const [, setForceRender] = useState(false);

  useEffect(() => {
    async function initCategories() {
      if (!TRANSPARENCIA_CATEGORIES) {
        try {
          const res = await servicio.getCategorias();
          TRANSPARENCIA_CATEGORIES = res;
          setForceRender(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
    initCategories();
  }, []);

  async function openHome() {
    try {
      if (!TRANSPARENCIA_CATEGORIES) {
        const res = await servicio.getCategorias();
        TRANSPARENCIA_CATEGORIES = res;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHomeOpen(!homeOpen);
    }
  }

  async function openTransparencia() {
    try {
      if (!TRANSPARENCIA_CATEGORIES) {
        const res = await servicio.getCategorias();
        TRANSPARENCIA_CATEGORIES = res;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTransparenciaOpen(!transparenciaOpen);
    }
  }

  return (
    <aside className="h-full w-full min-h-[60vh] bg-gray-200 rounded-xl flex flex-col py-4 px-4">
      {/* HOME */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => openHome()}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          HOME
          <svg
            className={`w-5 h-5 transition-transform ${homeOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {homeOpen && TRANSPARENCIA_CATEGORIES && (
          <div className="flex flex-col pl-2 mt-1">
            {TRANSPARENCIA_CATEGORIES.filter((c) => c.section == "home").map(
              (label) => (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => onSelectCategory(label.name)}
                  className={`text-left py-2 px-2 rounded hover:bg-gray-300 ${selectedCategory === label.name ? "text-blue-base font-medium" : "text-black-base"}`}
                >
                  {label.name}
                </button>
              ),
            )}
          </div>
        )}
      </div>

      {/* TRANSPARENCIA */}
      <div className="flex flex-col mt-2">
        <button
          type="button"
          onClick={() => openTransparencia()}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          TRANSPARENCIA
          <svg
            className={`w-5 h-5 transition-transform ${transparenciaOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {transparenciaOpen && TRANSPARENCIA_CATEGORIES && (
          <div className="flex flex-col pl-2 mt-1">
            {TRANSPARENCIA_CATEGORIES.filter(
              (c) => c.section == "transparencia",
            ).map((label: cat) => (
              <button
                key={label.id}
                type="button"
                onClick={() => onSelectCategory(label.name)}
                className={`text-left py-2 px-2 rounded hover:bg-gray-300 ${selectedCategory === label.name ? "text-blue-base font-medium" : "text-black-base"}`}
              >
                {label.name}
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
          className={`flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-gray-300 font-medium ${selectedCategory === "Editar categorías" ? "text-blue-base" : "text-black-base"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Editar categorías
        </button>
      </div>
    </aside>
  );
}
