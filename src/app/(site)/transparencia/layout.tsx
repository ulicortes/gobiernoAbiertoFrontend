'use client'
import Contacto from "@/components/Contacto";
import MenuTransparencia from "@/components/MenuTransparencia";
import { usePathname } from "next/navigation";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let path = usePathname();
    let txt = path.split('/')[2]?.toUpperCase();

    return (
        <div className="w-full h-fit md:h-250 min-h-screen mt-24. bg-transparent z-50 flex flex-col md:justify-center items-center">
            <h1 className="inline md:hidden text-black-base text-center text-5xl pb-10 font-bold w-full h-fit">{txt || 'TRANSPARENCIA'}</h1>
            <div className="w-full h-full pt-50 flex flex-col-reverse md:flex-row justify-start items-start">

                <div className="w-full md:w-2/5 h-full flex flex-col items-center gap-10">
                    <MenuTransparencia />

                    {/* <div className="py-4"></div> */}
                    {path == '/transparencia/recibos-de-funcionarios' || path == '/transparencia/declaraciones-juradas-de-funcionarios' || path == '/transparencia/nomina-del-personal'
                        ? <Contacto titulo="DIRECCIÓN DE RECURSOS HUMANOS"
                            responsable="Directora de Recursos Humanos Dra. Clara Rodriguez"
                            direccion="Avenida San Martin 1150"
                            telefono="(02261) 44-3900  44-2126 int 1023"
                            email="recursoshumanosloberia@gmail.com"
                        />
                        :
                        <></>}
                    {path == '/transparencia/reportes-economicos'
                        ? <Contacto titulo="SECRETARÍA DE ECONOMÍA Y HACIENDA"
                            responsable="Directora: Cdora. Magdalena De Noia"
                            direccion="Avenida San Martin 1150"
                            telefono="(02261) 44 2128"
                            email="economiamunicipalloberia@gmail.com"
                        />
                        :
                        <></>}
                </div>

                {children}

            </div>
        </div>
    );
}
