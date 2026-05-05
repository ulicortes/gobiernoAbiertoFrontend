"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import { servicio } from "@/services/service";

const CATEGORIA_INFORMES = "Informes de gestión";

type ArchivoCategoria = {
  id: string;
  title?: string;
  name?: string;
  date?: string;
  year?: number;
};

function anioDelArchivo(file: ArchivoCategoria): number {
  if (typeof file.year === "number" && !Number.isNaN(file.year)) {
    return file.year;
  }
  const d = file.date ? new Date(file.date) : null;
  if (d && !Number.isNaN(d.getTime())) {
    return d.getFullYear();
  }
  return new Date().getFullYear();
}

function urlAbsolutaArchivo(filePath: string): string {
  const base = (api.defaults.baseURL || "").replace(/\/$/, "");
  const rel = filePath.replace(/^\/+/, "");
  return `${base}/${rel}`;
}

/** Un informe por año: si hay varios, se usa el de fecha más reciente. */
function archivosPorAnio(files: ArchivoCategoria[]): Map<number, ArchivoCategoria> {
  const map = new Map<number, ArchivoCategoria>();
  for (const file of files) {
    const year = anioDelArchivo(file);
    const prev = map.get(year);
    if (!prev) {
      map.set(year, file);
      continue;
    }
    const tNew = file.date ? new Date(file.date).getTime() : 0;
    const tPrev = prev.date ? new Date(prev.date).getTime() : 0;
    if (tNew >= tPrev) {
      map.set(year, file);
    }
  }
  return map;
}

export default function InformesGestion() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ArchivoCategoria[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resultado = await servicio.getUltimosArchivosDeUnaCategoria(CATEGORIA_INFORMES);
        if (!cancelled) {
          setFiles(Array.isArray(resultado) ? resultado : []);
        }
      } catch {
        if (!cancelled) {
          setFiles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { yearsSorted, byYear } = useMemo(() => {
    const map = archivosPorAnio(files);
    const yearsSorted = [...map.keys()].sort((a, b) => b - a);
    return { yearsSorted, byYear: map };
  }, [files]);

  async function abrirInforme(year: number) {
    try {
      const file = byYear.get(year);
      if(!file) {
        setMessage("No hay archivo disponible para descargar este año.");
        return;
      }
      const response = await servicio.descargarArchivo(file?.id);
      
      const url = window.URL.createObjectURL(new Blob([response?.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file?.title || '');

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar:", error);
    }
  }

  return (
    <section className="w-full py-20 pb-10 bg-white">
      <div className="py-12 px-8 bg-green-base from-green-light to-green-base flex flex-col items-center justify-center gap-8">
        <h2 className="text-white-base text-3xl md:text-4xl font-bold text-center">
          MIRÁ TODO LO QUE VENIMOS HACIENDO EN LOBERÍA
        </h2>
        {loading ? (
          <p className="text-white-base text-center">Cargando informes…</p>
        ) : yearsSorted.length === 0 ? (
          <p className="text-white-base text-center max-w-md">
            Todavía no hay informes de gestión publicados.
          </p>
        ) : (
          <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6">
            {yearsSorted.map((year) => (
              <button
                type="button"
                key={year}
                onClick={() => abrirInforme(year)}
                className="bg-white-base rounded-lg px-6 py-4 text-center flex flex-col items-center justify-center min-w-[120px] shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg/40 hover:scale-105 border-0 font-inherit"
              >
                <h3 className="text-4xl md:text-4xl font-bold text-black-base mb-1">
                  {year}
                </h3>
                <p className="text-sm md:text-base text-black-base font-sans">
                  Informe de gestión
                </p>
              </button>
            ))}
          </div>
        )}
        {message && (
          <div className="w-3/5 flex flex-row justify-between items-center bg-black-dark py-1 px-4 rounded-xl">
            <h2 className="text-2xl text-white-base">{message}</h2>
            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-2xl text-white-base cursor-pointer hover:underline bg-transparent border-0 font-inherit"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
