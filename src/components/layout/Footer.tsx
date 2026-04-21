import ColorDivider from "@/components/ui/ColorDivider";

export default function Footer() {
    return <div className="w-full">
        <ColorDivider />
        <footer className="w-full py-15 bg-black-base flex flex-col md:flex-row justify-evenly items-center gap-6 md:gap-0">
            <div className="w-full md:w-1/3 px-8 flex justify-center md:justify-start">
                <img src="/logo_municipio_footer.png" alt="" />
            </div>
            <div className="w-full md:w-1/3 h-full pt-10 md:pt-0 flex flex-col items-center justify-center md:items-start gap-5">
                <div className="w-full h-1/2 flex flex-row justify-center items-center gap-2">
                    <img className="h-[1.5em] w-auto" src="/Map.png" alt="" />
                    <h1 className="text-xl text-center md:text-left">Avenida San Martín 51, Lobería, Buenos Aires</h1>
                </div>
                <div className="w-full h-1/2 flex flex-row justify-center items-center gap-2">
                    <img className="h-[1.5em] w-auto" src="/Phone.png" alt="" />
                    <h1 className="text-xl text-center md:text-left">02261 44-2126</h1>
                </div>
            </div>
        </footer>
    </div>
}