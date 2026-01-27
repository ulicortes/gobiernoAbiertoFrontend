'use client'
import { useState } from "react"
import LoginMenu from "./LoginMenu";
import { CookiesProvider, useCookies } from 'react-cookie'

export default function LoginUser() {
    let [open, setOpen] = useState(false);
    
    return <div className="w-full h-fit">
        <div className="w-full h-fit py-2 px-1 flex justify-end">
            {/* <img src="login.png" alt="" onClick={() => setOpen(!open)} className="w-32 cursor-pointer" /> */}
            <div onClick={() => setOpen(!open)} className="w-10 bg-green-base rounded-3xl border-3 border-black cursor-pointer">
                <img src="/user.png" alt="" />
            </div>
        </div>
        {open ?
            <div className="w-full h-screen absolute top-0 left-0 z-50 bg-black/70 flex justify-center items-center">
                <div className="w-3/6 h-3/5 bg-slate-300 rounded-md flex flex-col justify-start items-center">
                    <div className="w-full h-fit bg-slate-200 px-2 font-bold flex justify-end">
                        <h1 onClick={() => setOpen(!open)} className="cursor-pointer text-black">X</h1>
                    </div>
                    <LoginMenu />
                </div>
            </div>
            :
            <></>}
    </div>

}