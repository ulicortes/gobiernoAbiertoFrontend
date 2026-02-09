'use client'
import { useState } from "react";

export default function TablaDescargas({ selector, listado }: { selector: boolean, listado: String[] }) {
    let [anio, setAnio] = useState("2025");
    return <div className="w-5/6 h-full bg-white rounded-md text-black overflow-hidden shadow-lg/40">
        <div className="descargas w-full h-full max-h-150 overflow-y-scroll">
            <table className="w-full h-full">
                <thead className="text-white">
                    <tr>
                        <th colSpan={2} className="text-2xl bg-black sticky top-0 px-1. py-2">Descargas</th>
                    </tr>
                    {selector ?
                        <tr>
                            <th colSpan={2} className="text-2xl bg-black sticky top-0 md:top-10.">
                                <select value={anio} onChange={e => setAnio(e.target.value)} className="bg-black cursor-pointer" >
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                            </th>
                        </tr>
                        :
                        <></>}
                    <tr>
                        <th className="text-start text-md bg-black px-1 sticky top-8">Adjunto</th>
                        <th className="text-start text-md bg-black px-1 sticky top-8">Tamaño</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {selector ?
                        listado.filter(h => h.includes(anio)).map((h, index) => (
                            <tr key={index} className="border-y-1 border-black">
                                <td className="p-1 hover:underline cursor-pointer">{h}</td>
                                <td className="p-1">308 KB</td>
                            </tr>
                        ))
                        :
                        listado.map((h, index) => (
                            <tr key={index} className="border-y-1 border-black">
                                <td className="p-1 hover:underline cursor-pointer">{h}</td>
                                <td className="p-1">308 KB</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
}   