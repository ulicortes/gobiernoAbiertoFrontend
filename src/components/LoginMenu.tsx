export default function LoginMenu() {
    return <div className="w-full h-full text-black bg-slate-200 flex flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Iniciar sesion de administrador</h1>
        <form action="" className="w-3/4 h-3/5 bg-white px-8 rounded-xl flex flex-col justify-evenly items-start">
            <div className="w-full flex flex-col">
                <label htmlFor="" className="font-bold">Email</label>
                <input type="text" className="border-1 border-black rounded-md px-2" />
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="" className="font-bold">Contraseña</label>
                <input type="password" className="border-1 border-black rounded-md px-2" />
            </div>
            <div className="w-full flex justify-center">
                <input type="submit" value="Ingresar" className="w-full bg-black text-white px-2 rounded-lg cursor-pointer" />
            </div>
            <h1 className="text-sm font-bold underline cursor-pointer">¿Olvidaste tu contraseña?</h1>

        </form>
        <img src="/logo_municipio_negro.png" alt="" className="w-42 py-4" />
    </div>
}