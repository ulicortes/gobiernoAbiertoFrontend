import TablaDescargas from "@/components/TablaDescargas"

export default function Page() {
    let nomina = ["Nómina de Empleados"]
    return <div className="w-3/5 h-full flex flex-col animate-fade items-center">
        <TablaDescargas selector={false} listado={nomina} />
    </div>
}