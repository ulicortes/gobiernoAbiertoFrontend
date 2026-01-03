export default function Footer() {
    return <div className="w-full">
        <div className="w-full flex flex-row">
            <div className="w-1/4 h-1 bg-green-base"></div>
            <div className="w-1/4 h-1 bg-blue-base"></div>
            <div className="w-1/4 h-1 bg-red-base"></div>
            <div className="w-1/4 h-1 bg-yellow-base"></div>
        </div>
        <footer className="w-full h-32 bg-neutral-900 flex flex-row justify-evenly items-center">
            <div className="w-1/3 h-full flex items-center justify-center">
                <img className="w-5/5" src="logo_municipio_footer.png" alt="" />
            </div>
            <div className="w-1/3 h-full flex flex-col items-center. justify-center.">
                <div className="w-full h-1/2 flex flex-row justify-start items-center">
                    <img className="w-6 h-5 px-1" src="Map.png" alt="" />
                    <h1 className="text-sm">Avenida San Martín 51, Lobería, Buenos Aires</h1>
                </div>
                <div className="w-full h-1/2 flex flex-row justify-start items-center">
                    <img className="w-6 h-5 px-1" src="Phone.png" alt="" />
                    <h1 className="text-sm">02261 44-2126</h1>
                </div>
            </div>
        </footer>
    </div>
}