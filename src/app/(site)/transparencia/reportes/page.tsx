'use client'
import Contacto from "@/components/Contacto";
import Historial from "@/components/Historial";
import { useState } from "react";

export default function Page() {
    const [activo, setActivo] = useState(0);
    let anios = [2025, 2024, 2023, 2022];
    const handleToggle = (a: number) => {
        setActivo(prevAnio => (prevAnio === a ? 0 : a));
    };
    return <div className="animate-fade w-full md:w-3/5 h-fit md:h-3/6 flex flex-col justify-start items-center">
        {anios.map(a => (
            <Historial key={a} anio={a} abierto={activo === a} onToggle={() => handleToggle(a)} />
        ))}
    </div>
}
