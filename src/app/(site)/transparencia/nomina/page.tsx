'use client'
import DataTable from "@/components/DataTable";
import { getTableDataForCategory } from "@/lib/tableData";

export default function Page() {
    const { rows, columns } = getTableDataForCategory("Nómina del personal");

    return <div className="w-full md:w-3/5 h-fit flex flex-col animate-fade items-center">
        <DataTable rows={rows} columns={columns} />
    </div>
}
