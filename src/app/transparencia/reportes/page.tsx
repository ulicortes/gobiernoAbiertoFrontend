'use client'
import Historial from "@/components/Historial";
import { useState } from "react";

export default function Page() {
    const [activo, setActivo] = useState(0);
    let anios = [2025, 2024, 2023, 2022];
    const handleToggle = (a: number) => {
    // Si el ID es el mismo que ya está abierto, lo cerramos (null)
    // Si es distinto, abrimos el nuevo
    setActivo(prevAnio => (prevAnio === a ? 0 : a));
  };
    return <div className="w-3/5 h-fit flex flex-col justify-start bg-white items-center">
        {anios.map(a => (
            <Historial key={a} anio={a} abierto={activo===a} onToggle={() => handleToggle(a)} />
        ))}
    </div>
}