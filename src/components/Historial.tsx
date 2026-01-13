'use client'

import { useState } from "react"

export default function Historial({ anio }: { anio: number }) {
    const [abierto, setAbierto] = useState(false);
    return <div onClick={() => setAbierto(!abierto)} className="w-1/2 h-fit bg-neutral-900 text-white p-2 rounded-md cursor-pointer flex flex-col justify-center">
        <div className="flex flex-row justify-between">
            <h1 className="text-lg">{anio}</h1>
            <h1 className="text-lg">▼</h1>
        </div>
        {abierto ? <>
            <h1>Holis</h1>
        </>
            :
            <></>}
    </div>
}