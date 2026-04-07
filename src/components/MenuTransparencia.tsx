'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

// .toUpperCase().replace("_", " ")


export default function MenuTransparencia() {
    let path = usePathname();

    return <div className="w-5/6 h-80 bg-[#BFEEFF] shadow-lg/40 rounded-lg text-black text-center flex flex-col justify-evenly items-center">
        <Link href={'/transparencia/haberes'}>
            <h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/haberes' ? 'text-blue-base' : ''}`}>
                HABERES DE EMPLEADOS</h1>
        </Link>
        <div className="w-4/6 border-b-3 border-blue-base"></div>
        <Link href={'/transparencia/recibos'}>
            <h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/recibos' ? 'text-blue-base' : ''}`}>
                RECIBOS DE FUNCIONARIOS</h1>
        </Link>
        <div className="w-4/6 border-b-3 border-blue-base"></div>
        <Link href={'/transparencia/ddjj'}>
            <h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/ddjj' ? 'text-blue-base' : ''}`}>
                DECLARACIONES JURADAS DE FUNCIONARIOS</h1>
        </Link>
        <div className="w-4/6 border-b-3 border-blue-base"></div>
        <Link href={'/transparencia/nomina'}>
            <h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/nomina' ? 'text-blue-base' : ''}`}>
                NÓMINA DEL PERSONAL</h1>
        </Link>
        <div className="w-4/6 border-b-3 border-blue-base"></div>
        <Link href={'/transparencia/reportes'}>
            <h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/reportes' ? 'text-blue-base' : ''}`}>
                REPORTES ECONOMICOS</h1>
        </Link>
    </div>
}