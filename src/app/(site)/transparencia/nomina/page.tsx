import TablaDescargas from "@/components/TablaDescargas"
import DataTable from "@/components/DataTable"

export default function Page() {
    let nomina = ["Nómina de Empleados"]
    return <div className="w-full md:w-3/5 h-fit flex flex-col animate-fade items-center">
        {/* <TablaDescargas selector={false} listado={nomina} /> */}
        <DataTable />
    </div>
}
