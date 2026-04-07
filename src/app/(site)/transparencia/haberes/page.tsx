'use client'
import { servicio } from "@/services/service";
import DataTable from "@/components/DataTable";
import { columnsAdmin, columnsUser } from "@/lib/TableColumns";
import { getTableDataForCategory } from "@/lib/tableData";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ElementoUser, ElementoAdmin } from "@/types/elemento";

export default function Page() {
  let path = usePathname();
  let txt = path.split('/')[2];

  const [rowsAdmin, setRowsAdmin] = useState<ElementoAdmin[]>([]);
  const [rows, setRows] = useState<ElementoUser[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resultado: ElementoAdmin[] = await servicio.getArchivosDeUnaCategoria(txt);
        let rowsUser = resultado.map(({ id, ...obj }) => obj);
        setRowsAdmin(resultado);
        setRows(rowsUser);
      } catch (error) {
        console.error("Error al conectar con NestJS:", error);
      }
    };

    obtenerDatos();
  }, []);
  const user = false;

  if(user) return <div className="w-full md:w-3/5 h-100 md:h-80. md:h-3/6 flex flex-col animate-fade items-center">
    <DataTable rows={rowsAdmin} columns={columnsAdmin} />
  </div>
  else return <div className="w-full md:w-3/5 h-100 md:h-80. md:h-3/6 flex flex-col animate-fade items-center">
    <DataTable rows={rows} columns={columnsUser} />
  </div>
}
