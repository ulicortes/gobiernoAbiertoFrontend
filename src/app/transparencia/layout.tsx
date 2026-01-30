'use client'
import Contacto from "@/components/Contacto";
import LoginUser from "@/components/LoginUser";
import MenuTransparencia from "@/components/MenuTransparencia";
import { usePathname } from "next/navigation";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let path = usePathname();
    console.log(path);
    return (
        <div className="w-full h-250 mt-24 bg-transparent z-50 flex flex-col justify-start items-center">
            <div className="w-full h-1/3 flex flex-col py-2 layout-transparencia">
            </div>
                <LoginUser />
                <h1 className="text-white text-shadow-lg text-shadow-black text-center text-5xl pb-10 font-bold w-full">TRANSPARENCIA</h1>
            <div className="animate-fade w-full h-full max-h-screen flex flex-row justify-start">
                <div className="w-2/5 h-full flex flex-col justify-start items-center">
                    <MenuTransparencia />
                    <div className="py-4"></div>
                    {path == '/transparencia/recibos' || path == '/transparencia/ddjj' || path == '/transparencia/nomina'
                        ? <Contacto titulo="DIRECCIÓN DE RECURSOS HUMANOS"
                            responsable="Directora de Recursos Humanos Dra. Clara Rodriguez"
                            direccion="Avenida San Martin 1150"
                            telefono="(02261) 44-3900  44-2126 int 1023"
                            email="recursoshumanosloberia@gmail.com"
                        />
                        :
                        <></>}
                    {path == '/transparencia/reportes'
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
