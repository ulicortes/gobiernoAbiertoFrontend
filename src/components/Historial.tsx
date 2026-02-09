'use client'

export default function Historial({ anio, abierto, onToggle }: { anio: number, abierto: boolean, onToggle: () => void }) {
    return <div className="mb-4 w-11/12 md:w-2/3 h-fit text-white flex flex-col justify-center">
        <div onClick={onToggle} className={`bg-black-base cursor-pointer flex flex-row justify-between ${abierto ? 'rounded-t-4xl' : 'rounded-4xl'}`}>
            <h1 className="py-6 pl-10 text-5xl font-bold w-2/6 text-center">{anio}</h1>
            <div className="py-6 w-1/6 flex justify-center items-center">
                <span className={`text-4xl inline-block transition-transform duration-300 origin-center ${abierto ? 'rotate-180' : ''}`}>▼</span>
            </div>
        </div>
        {abierto ? <div className="w-full h-74 p-2 bg-white text-black flex flex-col justify-center border-1 border-black-base rounded-b-4xl">
            <div>
                <h1 className="text-md text-center font-bold cursor-pointer hover:underline">PRESUPUESTO ANUAL</h1>
            </div>
            <hr className="w-3/4 h-1 bg-blue-light border-0 rounded-lg my-3 self-center my-0 shrink-0" aria-hidden />
            <div className="historial w-full px-2 overflow-y-scroll">
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
    return <div className="w-5/6 self-center flex flex-col items-start font-sans">
        <p className="py-2 text-sm cursor-pointer hover:underline">Situación económica financiera al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Cuenta ahorro inversión financiamiento de ejecución presupuestaria al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Disponibilidades al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Estado de ejecución del presupuesto de gastos al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Estado de ejecución del presupuesto de gastos por finalidad y función al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Estado de ejecución presupuestaria de recursos al {dia}/{mes}/{anio}</p>
        <p className="py-2 text-sm cursor-pointer hover:underline">Registro de endeudamiento municipal al {dia}/{mes}/{anio}</p>
    </div>
}