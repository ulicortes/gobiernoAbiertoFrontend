import TablaDescargas from "@/components/TablaDescargas";

export default function Page() {
    const cargos = [
        "15/01/2026 Intendente",
        "15/01/2026 Secretario de Gobierno",
        "15/01/2026 Secretaria de Economía y Hacienda",
        "15/01/2026 Secretario de Obras y Servicios Públicos",
        "15/01/2026 Secretario de Salud y Desarrollo Social",
        "15/01/2026 Secretaria Privada",
        "15/01/2026 Secretaria de Innovación y Coordinación",
        "15/01/2026 Asesora Letrada",
        "15/01/2026 Jueza de Faltas",
        "15/01/2026 Director de Desarrollo Local",
        "15/01/2026 Titular Oficina de Trabajo, Empleo y Economía Social",
        "15/01/2026 Titular Oficina de Gestión Ambiental",
        "15/01/2026 Director de Deporte",
        "15/01/2026 Coordinador de Talleres",
        "15/01/2026 Director de Turismo",
        "15/01/2026 Directora de Cultura",
        "15/01/2026 Director de Seguridad",
        "15/01/2026 Delegado de San Manuel",
        "15/01/2026 Director de Juventud y Educación",
        "15/01/2026 Contadora Municipal",
        "15/01/2026 Tesorero Municipal",
        "15/01/2026 Jefe de Compras",
        "15/01/2026 Directora de Ingresos Públicos",
        "15/01/2026 Directora de Recursos Humanos",
        "15/01/2026 Directora de Hospital Municipal",
        "15/01/2026 Director Administrativo del Sistema Social de Salud",
        "15/01/2026 Director de Servicios Urbanos",
        "15/01/2026 Director de Vivienda",
        "15/01/2026 Director de Infraestructura",
        "15/01/2026 Director de Planeamiento Urbano, Obras Privadas y Catastro",
        "15/01/2026 Director de Mantenimiento Vial",
        "15/01/2026 Directora de Desarrollo Social",
        "15/01/2026 Titular Mantenimiento de Maquinarias y Automotores",
        "15/01/2026 Directora de los Centros de Atención Primaria",
        "15/01/2026 Director del Centro de Salud de San Manuel",
        "15/01/2026 Coordinadora Integración Comunitaria"
    ];
    return <div className="w-full md:w-3/5 h-80 md:h-4/6 flex flex-col animate-fade items-center">
        <TablaDescargas selector={false} listado={cargos} />
    </div>
}