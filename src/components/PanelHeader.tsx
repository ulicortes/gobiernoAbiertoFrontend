import ColorDivider from "@/components/ColorDivider";

export default function PanelHeader() {
    return <header className="w-full flex flex-col items-center bg-white border-b border-gray-200">
        <div className="w-full flex flex-row justify-between items-center px-4 md:px-8 py-3">
            <img src="logo_municipio_negro.png" alt="" />
            <p className="text-sm md:text-base text-black-base">Bienvenido, Administrador</p>
        </div>
        <ColorDivider barHeight="h-1.5" />
    </header>
}