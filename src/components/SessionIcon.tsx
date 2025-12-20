export default function SessionIcon() {
    return <div className="w-56 h-12 flex flex-row justify-center">
        <div className="w-3/5 h-4/5 text-center text-black bg-green-500 content-center self-center rounded-l-3xl">
            Iniciar sesion
        </div>
        <div className="w-1/5 h-full bg-green-500 border-2 border-black rounded-3xl -ml-3">
            <img className="w-3/3 h-3/3" src="user.png" alt="" />
        </div>
    </div>
}