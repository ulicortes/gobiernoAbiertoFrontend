"use client";

import { servicio } from "@/services/service";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toSlug } from "@/lib/slugify";

interface Cat {
  id: number;
  name: string;
  section: string;
}

export default function PanelSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Cat[]>([]);
  const [homeOpen, setHomeOpen] = useState(true);
  const [transparenciaOpen, setTransparenciaOpen] = useState(true);

  useEffect(() => {
    servicio
      .getCategorias()
      .then((res) => setCategories(res || []))
      .catch(console.error);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  function catLink(name: string) {
    return `/panel/archivos/${toSlug(name)}`;
  }

  const linkClass = (href: string) =>
    `text-left py-2 px-2 rounded hover:bg-gray-300 ${
      isActive(href) ? "text-blue-base font-medium" : "text-black-base"
    }`;

  return (
    <aside className="h-full w-full min-h-[60vh] bg-gray-200 rounded-xl flex flex-col py-4 px-4">
      {/* HOME */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setHomeOpen((o) => !o)}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          HOME
          <svg
            className={`w-5 h-5 transition-transform ${homeOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {homeOpen && (
          <div className="flex flex-col pl-2 mt-1">
            {categories
              .filter((c) => c.section === "home")
              .map((cat) => (
                <Link key={cat.id} href={catLink(cat.name)} className={linkClass(catLink(cat.name))}>
                  {cat.name}
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* TRANSPARENCIA */}
      <div className="flex flex-col mt-2">
        <button
          type="button"
          onClick={() => setTransparenciaOpen((o) => !o)}
          className="flex items-center justify-between w-full text-left font-bold text-black-base py-2 hover:bg-gray-300 rounded px-2"
        >
          TRANSPARENCIA
          <svg
            className={`w-5 h-5 transition-transform ${transparenciaOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {transparenciaOpen && (
          <div className="flex flex-col pl-2 mt-1">
            {categories
              .filter((c) => c.section === "transparencia")
              .map((cat) => (
                <Link key={cat.id} href={catLink(cat.name)} className={linkClass(catLink(cat.name))}>
                  {cat.name}
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* CUENTA */}
      <div className="flex flex-col mt-4 border-t border-gray-300 pt-3 gap-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
          Cuenta
        </p>
        <Link href="/panel/password" className={linkClass("/panel/password") + " font-medium"}>
          Mi contraseña
        </Link>
        {user?.role === "super_admin" && (
          <Link href="/panel/usuarios" className={linkClass("/panel/usuarios") + " font-medium"}>
            Usuarios
          </Link>
        )}
      </div>

      {/* EDITAR CATEGORÍAS */}
      <div className="mt-auto border-t border-gray-300 pt-4">
        <Link
          href="/panel/categorias"
          className={`flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-gray-300 font-medium ${
            isActive("/panel/categorias") ? "text-blue-base" : "text-black-base"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Editar categorías
        </Link>
      </div>
    </aside>
  );
}
