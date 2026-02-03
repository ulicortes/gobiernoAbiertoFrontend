'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
    let path = usePathname()
    const [hoverBorderColor, setHoverBorderColor] = useState<string | null>(null);

    const getBorderColor = () => {
        if (hoverBorderColor) return hoverBorderColor;
        return path.startsWith('/transparencia') ? 'border-blue-base' : 'border-green-base';
    };

    return <nav className={`fixed top-0 left-0 right-0 z-50 w-full h-24 bg-black-base border-b-4 transition-colors duration-300 ${getBorderColor()} flex flex-row justify-between`}>
        <div className="h-full flex justify-center items-center">
            <Link href={'/'}><img src="logo_municipio.png" alt="" className="w-4/5 pl-2" /></Link>
        </div>
        <div className="w-3/4 h-full flex flex-col justify-between items-end">
            <div className="w-1/5 bg-green-base py-1 rounded-bl-xl flex flex-row justify-around">
                <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="Facebook.png" alt="" />
                <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="Mail.png" alt="" />
                <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="Instagram.png" alt="" />
            </div>
            <div className="w-5/5 flex flex-row self-center justify-evenly">
                <Link 
                    href={'/transparencia'}
                    onMouseEnter={() => setHoverBorderColor('border-blue-base')}
                    onMouseLeave={() => setHoverBorderColor(null)}
                >
                    <h1 className={`w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 ${path.startsWith('/transparencia') ? 'bg-blue-base' : ''} hover:bg-blue-base`}>TRANSPARENCIA</h1>
                </Link>
                <Link 
                    href={'/'}
                    onMouseEnter={() => setHoverBorderColor('border-red-base')}
                    onMouseLeave={() => setHoverBorderColor(null)}
                >
                    <h1 className="w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 hover:bg-red-base">DATOS ABIERTOS</h1>
                </Link>
                <Link 
                    href={'https://sibom.slyt.gba.gob.ar/cities/73'}
                    onMouseEnter={() => setHoverBorderColor('border-yellow-base')}
                    onMouseLeave={() => setHoverBorderColor(null)}
                >
                    <h1 className="w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 hover:bg-yellow-base">BOLETIN OFICIAL</h1>
                </Link>
            </div>
        </div>
    </nav>
}