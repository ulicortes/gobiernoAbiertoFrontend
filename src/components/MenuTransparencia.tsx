'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { servicio } from "@/services/service";

interface cat {
  id: number;
  name: string;
  slug?: string;
  section: string;
}

export default function MenuTransparencia() {
    let path = usePathname();
    const [categories, setCategories] = useState<cat[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await servicio.getCategorias();
                if (res) {
                    const transCats = res.filter((c: cat) => c.section.toLowerCase() === "transparencia");
                    setCategories(transCats);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // Decodificar la URL para igualarlo con el nombre exacto de la DB.
    const currentCategory = decodeURIComponent(path.split('/')[2] || "");

    return (
        <div className="w-5/6 h-auto min-h-80 py-4 px-2 bg-[#BFEEFF] shadow-lg/40 rounded-lg text-black text-center flex flex-col justify-evenly items-center gap-4">
            {categories.map((cat, index) => {
                const targetSlug = cat.slug || encodeURIComponent(cat.name);
                const isSelected = currentCategory === targetSlug || currentCategory === cat.name;
                return (
                    <div key={cat.id} className="w-full flex flex-col items-center">
                        <Link href={`/transparencia/${targetSlug}`}>
                            <h1 className={`font-bold hover:text-blue-dark ${isSelected ? 'text-blue-base' : ''}`}>
                                {cat.name.toUpperCase()}
                            </h1>
                        </Link>
                        {index !== categories.length - 1 && (
                            <div className="w-4/6 border-b-3 border-blue-base mt-4"></div>
                        )}
                    </div>
                );
            })}
            
            {categories.length === 0 && (
                <p className="text-gray-600 italic">Cargando categorías...</p>
            )}
        </div>
    );
}