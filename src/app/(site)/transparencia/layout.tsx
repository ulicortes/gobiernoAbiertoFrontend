'use client'
import ContactCard from "@/components/public/ContactCard";
import MenuTransparencia from "@/components/ui/MenuTransparencia";
import { usePathname } from "next/navigation";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname();

    return (
        <div className="w-full min-h-screen mt-24 flex flex-col md:flex-row items-start pt-10 md:pt-20">
            <aside className="w-full md:w-2/5 md:max-w-[40%] md:shrink-0 flex flex-col items-stretch gap-10 px-2 md:px-0">
                <div className="flex w-full justify-center">
                    <MenuTransparencia />
                </div>

                <div className="flex mb-15 md:mb-0 w-full justify-center">
                    {(path.startsWith('/transparencia/recibos-de-funcionarios')  ||
                        path.startsWith('/transparencia/declaraciones-juradas-de-funcionarios') ||
                        path.startsWith('/transparencia/nomina-del-personal')) && (
                            <ContactCard
                                titulo="DIRECCIÓN DE RECURSOS HUMANOS"
                                responsable="Directora de Recursos Humanos Dra. Clara Rodriguez"
                                direccion="Avenida San Martin 1150"
                                telefono="(02261) 44-3900  44-2126 int 1023"
                                email="recursoshumanosloberia@gmail.com"
                            />)}

                    {path.startsWith('/transparencia/reportes-economicos') && (
                        <ContactCard
                            titulo="SECRETARÍA DE ECONOMÍA Y HACIENDA"
                            responsable="Directora: Cdora. Magdalena De Noia"
                            direccion="Avenida San Martin 1150"
                            telefono="(02261) 44 2128"
                            email="economiamunicipalloberia@gmail.com"
                        />)}
                </div>
            </aside>

            <div className="w-full px-4 md:w-3/5 md:min-w-0 pb-16">
                {children}
            </div>

        </div>
    );
}
