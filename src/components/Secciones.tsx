import Link from "next/link";

export default function Secciones() {
    return <div className="w-full h-full text-center flex flex-col justify-center items-center py-6">
        <Link href={'/transparencia'} className="w-full h-fit overflow-hidden py-20 group text-white content-center bg-[url(/transparencia.png)] bg-cover cursor-pointer">
            <h1 className="text-3xl">TRANSPARENCIA</h1>
            <p className="relative left-300 group-hover:left-0 duration-300 ease-in-out">Aca iria un texto explicando brevemente lo que se encuentra
                en esta seccion para mejorar la experiencia de usuario.
            </p>
        </Link>
        <div className="w-full h-fit overflow-hidden py-20 group text-white content-center bg-[url(/datosabiertos.png)] bg-cover cursor-pointer">
            <h1 className="text-3xl">DATOS ABIERTOS</h1>
            <p className="relative left-300 group-hover:left-0 duration-300 ease-in-out">Aca iria un texto explicando brevemente lo que se encuentra
                en esta seccion para mejorar la experiencia de usuario.
            </p>
        </div>
        <div className="w-full h-fit overflow-hidden py-20 group text-white content-center bg-[url(/boletin.png)] bg-cover cursor-pointer">
            <h1 className="text-3xl">BOLETIN OFICIAL</h1>
            <p className="relative left-300 group-hover:left-0 duration-300 ease-in-out">Aca iria un texto explicando brevemente lo que se encuentra
                en esta seccion para mejorar la experiencia de usuario.
            </p>
        </div>
    </div>
}