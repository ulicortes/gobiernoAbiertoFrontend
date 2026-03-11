'use client'
import DataTable from "@/components/DataTable";
import { getTableDataForCategory } from "@/lib/tableData";

export default function Page() {
    const { rows, columns } = getTableDataForCategory("Declaraciones juradas");

    return <div className="w-full md:w-3/5 h-80 md:h-3/6 flex flex-col animate-fade items-center">
        <DataTable rows={rows} columns={columns} />
    </div>
}
