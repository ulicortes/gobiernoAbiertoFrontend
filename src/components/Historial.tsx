'use client'

export default function Historial({ anio, abierto, onToggle }: { anio: number, abierto: boolean, onToggle: () => void }) {
    return <div className="mb-4 w-2/3 h-fit bg-neutral-900 text-white rounded-t-md flex flex-col justify-center">
        <div onClick={onToggle} className="cursor-pointer flex flex-row justify-between">
            <h1 className="py-2 text-2xl w-2/6 text-center">{anio}</h1>
            <h1 className="py-2 text-2xl w-1/6 text-center">▼</h1>
        </div>
        {abierto ? <div className="w-full h-74 py-2 bg-white text-black flex flex-col justify-center border-1 border-black">
            <div>
                <h1 className="text-md text-center cursor-pointer hover:underline">Presupuesto anual</h1>
            </div>
            <div className="w-3/4 h-0.5 bg-blue-light self-center"></div>
            <div className="w-full px-2 overflow-y-scroll">
                <div className="w-full flex flex-col">
                    <h1 className="w-5/6 self-start text-2xl text-blue-light font-bold">Primer trimestre</h1>
                    {trimestre("31", "03", anio)}
                </div>
                <div className="w-full flex flex-col">
                    <h1 className="w-5/6 self-start text-2xl text-blue-light font-bold">Segundo trimestre</h1>
                    {trimestre("30", "06", anio)}
                </div>
                <div className="w-full flex flex-col">
                    <h1 className="w-5/6 self-start text-2xl text-blue-light font-bold">Tercer trimestre</h1>
                    {trimestre("30", "09", anio)}
                </div>
                <div className="w-full flex flex-col">
                    <h1 className="w-5/6 self-start text-2xl text-blue-light font-bold">Cuarto trimestre</h1>
                    {trimestre("31", "12", anio)}
                </div>
            </div>
        </div>
            :
            <></>}
    </div>
}

function trimestre(dia: String, mes: String, anio: number) {
    return <div className="w-5/6 self-center flex flex-col items-start">
        <p className="text-sm cursor-pointer hover:underline">Situación económica financiera al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Cuenta ahorro inversión financiamiento de ejecución presupuestaria al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Disponibilidades al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Estado de ejecución del presupuesto de gastos al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Estado de ejecución del presupuesto de gastos por finalidad y función al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Estado de ejecución presupuestaria de recursos al {dia}/{mes}/{anio}</p>
        <p className="text-sm cursor-pointer hover:underline">Registro de endeudamiento municipal al {dia}/{mes}/{anio}</p>
    </div>
}