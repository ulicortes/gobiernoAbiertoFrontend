'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function MenuTransparencia() {
    let path = usePathname()

    return <div className="w-1/4 h-2/4 bg-[#BFEEFF] rounded-lg text-black text-center flex flex-col justify-evenly items-center content-center">
        <Link href={'/transparencia/haberes'}><h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/haberes' ? 'text-blue-dark':''}`}>HABERES DE EMPLEADOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia/recibos'}><h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/recibos' ? 'text-blue-dark':''}`}>RECIBOS DE FUNCIONARIOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia/ddjj'}><h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/ddjj' ? 'text-blue-dark':''}`}>DECLARACIONES JURADAS DE FUNCIONARIOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia/nomina'}><h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/nomina' ? 'text-blue-dark':''}`}>NÓMINA DEL PERSONAL</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia/reportes'}><h1 className={`font-bold hover:text-blue-dark ${path == '/transparencia/reportes' ? 'text-blue-dark':''}`}>REPORTES ECONOMICOS</h1></Link>
    </div>
}