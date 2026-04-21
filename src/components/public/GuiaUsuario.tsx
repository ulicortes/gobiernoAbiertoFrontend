"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import { servicio } from "@/services/service";

const CATEGORIA_GUIAS = "Guías de usuario";

type ArchivoGuia = {
  id: string;
  date?: string;
  createdAt?: string;
  filePath?: string;
};

function urlAbsolutaArchivo(filePath: string): string {
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const base = (api.defaults.baseURL || "").replace(/\/$/, "");
  const rel = filePath.replace(/^\/+/, "");
  return base ? `${base}/${rel}` : `/${rel}`;
}

export default function GuiaUsuario() {
  const [files, setFiles] = useState<ArchivoGuia[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resultado = await servicio.getArchivosDeUnaCategoria(CATEGORIA_GUIAS);
        if (!cancelled) {
          setFiles(Array.isArray(resultado) ? resultado : []);
        }
      } catch {
        if (!cancelled) setFiles([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const latestGuide = useMemo(() => {
    if (files.length === 0) return null;
    return [...files].sort((a, b) => {
      const tA = new Date(a.date || a.createdAt || 0).getTime();
      const tB = new Date(b.date || b.createdAt || 0).getTime();
      return tB - tA;
    })[0];
  }, [files]);

  function abrirGuia() {
    const path = latestGuide?.filePath?.trim();
    if (!path) {
      setMessage("No hay una guía de usuario disponible para descargar.");
      return;
    }
    setMessage("");
    window.open(urlAbsolutaArchivo(path), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="w-full py-10 pb-10 px-8 bg-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <button
          type="button"
          onClick={abrirGuia}
          className="w-fit px-8 py-4 bg-green-base text-white text-xl font-bold uppercase rounded-lg hover:bg-green-dark transition-all duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!latestGuide}
        >
          GUÍA DE USUARIO
        </button>
        <p className="mt-8 text-center text-black-base font-sans max-w-2xl">
          Accedé a la guía de usuario para conocer cómo navegar y aprovechar todas las
          funcionalidades del portal.
        </p>
        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>
    </section>
  );
}
