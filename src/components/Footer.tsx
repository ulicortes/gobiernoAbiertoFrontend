export default function Footer() {
    return <div className="absolute bottom-0">
        <div className="w-screen flex flex-row">
            <div className="w-1/4 h-1 bg-green-500"></div>
            <div className="w-1/4 h-1 bg-blue-500"></div>
            <div className="w-1/4 h-1 bg-red-500"></div>
            <div className="w-1/4 h-1 bg-yellow-500"></div>
        </div>
        <footer className="w-screen h-32 bg-neutral-900 flex flex-row justify-center items-center">
            <div className="w-1/3 h-full flex items-center justify-center items-center">
                <img className="w-2/3" src="logo_municipio_footer.png" alt="" />
            </div>
            <div className="w-2/3 h-full flex items-center justify-center">
                <img className="w-1/3" src="footer_info.png" alt="" />
            </div>
        </footer>
    </div>
}