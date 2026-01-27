import Contacto from "@/components/Contacto";
import LoginUser from "@/components/LoginUser";
import MenuTransparencia from "@/components/MenuTransparencia";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen pt-24 bg-white flex flex-col justify-center items-center">
            <LoginUser />
            <div className="w-full h-full max-h-screen flex flex-row justify-around">
                <div className="w-2/5 h-full flex flex-col justify-around items-center">
                    <MenuTransparencia />
                    <Contacto titulo="SECRETARÍA DE ECONOMÍA Y HACIENDA"
                        responsable="Directora: Cdora. Magdalena De Noia"
                        direccion="Avenida San Martin 1150"
                        telefono="(02261) 44 2128"
                        email="email.com"
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
