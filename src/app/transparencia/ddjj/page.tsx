import TablaDescargas from "@/components/TablaDescargas";

export default function Page() {
    const cargos = [
  "Intendente",
  "Secretaria de Economía y Hacienda",
  "Secretario de Obras y Servicios Públicos",
  "Secretario de Salud y Desarrollo Social",
  "Asesora Letrada",
  "Titular OMIC",
  "Secretaria Privada",
  "Director de Vivienda",
  "Directora de Cultura",
  "Director Administrativa del Sistema Social de Salud",
  "Contadora Municipal",
  "Jefe de Compras",
  "Tesorero Municipal",
  "Directora de Recursos Humanos",
  "Directora de Ingresos Públicos",
  "Director de Servicios Públicos",
  "Director de Planeamiento Territorial",
  "Director de Infraestructura",
  "Directora de Desarrollo Social",
  "Director de Hábitat",
  "Secretaria del HCD",
  "Titular Oficina de Trabajo, Empleo y Economía Social",
  "Director de Juventud y Educación",
  "Director de Turismo",
  "Director de Turismo",
  "Secretaria de Innovación y Coordinación",
  "Titular Oficina de Gestión Ambiental",
  "Directora Hospital Municipal",
  "Director de Deportes",
  "Coordinador de Talleres",
  "Concejal",
  "Concejal",
  "Concejal",
  "Concejal",
  "Consejal"
];
    return <div className="w-3/5 h-full flex flex-col animate-fade items-center">
        <TablaDescargas selector={false} listado={cargos} />
    </div>
}