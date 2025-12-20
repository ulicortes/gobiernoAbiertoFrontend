export default function Nav() {
    return <nav className="absolute top-0 w-screen h-24 bg-neutral-900 border-b-4 border-green-500 flex flex-row justify-between">
        <div className="h-full flex justify-center items-center">
            <img src="logo_municipio.png" alt="" className="w-fit h-4/5 pl-2" />
        </div>
        <div className="w-3/4 h-full flex flex-col justify-between items-end">
            <div className="w-1/5 bg-green-600 py-1 rounded-bl-xl flex flex-row justify-around">
                <img className="w-6" src="Facebook.png" alt="" />
                <img className="w-6" src="Mail.png" alt="" />
                <img className="w-6" src="Instagram.png" alt="" />
            </div>
            <div className="w-4/5 flex flex-row self-center justify-evenly">
                <h1 className="w-1/4 py-1 text-center rounded-t-xl bg-blue-500">TRANSPARENCIA</h1>
                <h1 className="w-1/4 py-1 text-center rounded-t-xl bg-red-400">DATOS ABIERTOS</h1>
                <h1 className="w-1/4 py-1 text-center rounded-t-xl bg-yellow-500">BOLETIN OFICIAL</h1>
            </div>
        </div>
    </nav>
}