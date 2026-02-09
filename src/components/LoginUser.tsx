'use client'
import { useState } from "react"
import LoginMenu from "./LoginMenu";
// import { CookiesProvider, useCookies } from 'react-cookie'

export default function LoginUser() {
    let [open, setOpen] = useState(false);
    
    return <div className="w-full h-fit">
        <div className="w-full h-fit py-10 md:py-2 px-1 flex flex-row justify-center md:justify-end items-center">
            {/* <img src="login.png" alt="" onClick={() => setOpen(!open)} className="w-32 cursor-pointer" /> */}
            <p onClick={() => setOpen(!open)} className="h-full bg-green-base px-4 text-black rounded-full cursor-pointer shadow-xl shadow-black">Iniciar sesión</p>
            <div onClick={() => setOpen(!open)} className="w-10 hidden md:inline relative right-2 bg-green-base rounded-3xl border-2 border-black cursor-pointer shadow-xl shadow-black">
                <img src="/user.png" alt="" />
            </div>
        </div>
        {open ? (
            <div className="w-full h-screen fixed top-0 left-0 z-50 bg-black/40 flex justify-center items-center p-4">
                <LoginMenu onClose={() => setOpen(false)} />
            </div>
        ) : null}
    </div>

}