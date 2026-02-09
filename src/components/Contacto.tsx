export default function Contacto({titulo, responsable, direccion, telefono, email}:{titulo: string, responsable: string, 
    direccion: string, telefono: string, email: string}) {
    return <div className="w-5/6 h-50 bg-[#BFEEFF] p-5 shadow-lg/40 rounded-lg text-black text-center flex flex-col justify-evenly items-center">
        <h1 className="font-bold">{titulo}</h1>
        <h1>{responsable}</h1>
        <div className="w-3/4 border-b-3 my-4 border-blue-base"></div>
        <div className="flex flex-row w-full justify-start items-center font-sans">
            <img src="/Map_dark.png" alt="map" className="h-4 px-2" />
            <h1>{direccion}</h1>
        </div>
        <div className="flex flex-row w-full justify-start items-center font-sans">
            <img src="/Phone_dark.png" alt="map" className="h-4 px-2" />
            <h1>{telefono}</h1>
        </div>
        <div className="flex flex-row w-full justify-start items-center font-sans">
            <img src="/Mail_dark.png" alt="map" className="h-4 px-2" />
            <h1>{email}</h1>
        </div>
    </div>
}