import Link from "next/link";

export default function MenuTransparencia() {
    return <div className="w-1/4 h-2/4 bg-[#BFEEFF] rounded-lg text-black text-center flex flex-col justify-evenly items-center content-center">
        <Link href={'/transparencia'}><h1 className="font-bold hover:text-blue-dark">HABERES DE EMPLEADOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia'}><h1 className="font-bold hover:text-blue-dark">RECIBOS DE FUNCIONARIOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia'}><h1 className="font-bold hover:text-blue-dark">DECLARACIONES JURADAS DE FUNCIONARIOS</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia'}><h1 className="font-bold hover:text-blue-dark">NÓMINA DEL PERSONAL</h1></Link>
        <div className="w-3/4 border-b-2 border-blue-dark"></div>
        <Link href={'/transparencia'}><h1 className="font-bold hover:text-blue-dark">REPORTES ECONOMICOS</h1></Link>
    </div>
}