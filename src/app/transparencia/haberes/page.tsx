import Historial from "@/components/Historial";

export default function Page() {
    return <div className="w-3/5 h-full flex flex-col bg-white items-center">
        <div className="w-full h-fit bg-slate-100 rounded-md text-black p-4">
            <table className="w-full table-auto.">
                <thead className="border-b-2 border-black">
                    <tr>
                        <th colSpan={2} className="text-2xl">Descargas</th>
                    </tr>
                    <tr>
                        <th className="text-start text-md">Adjunto</th>
                        <th className="text-start text-md">Tamaño</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-y-1 border-black">
                        <td className="py-1">Haberes Noviembre 2025</td>
                        <td className="py-1">308 KB</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Historial anio={2025} />
    </div>
}