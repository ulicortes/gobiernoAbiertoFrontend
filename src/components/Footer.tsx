export default function Footer() {
    return <div className="w-full">
        <div className="w-full flex flex-row">
            <div className="w-1/4 h-1 bg-green-base"></div>
            <div className="w-1/4 h-1 bg-blue-base"></div>
            <div className="w-1/4 h-1 bg-red-base"></div>
            <div className="w-1/4 h-1 bg-yellow-base"></div>
        </div>
        <footer className="w-full h-32 bg-neutral-900 flex flex-row justify-evenly items-center">
            <div className="w-1/3 h-full flex items-center justify-center items-center">
                <img className="w-3/3" src="logo_municipio_footer.png" alt="" />
            </div>
            <div className="w-1/3 h-full flex items-center justify-end">
                <img className="w-2/3" src="footer_info.png" alt="" />
            </div>
        </footer>
    </div>
}