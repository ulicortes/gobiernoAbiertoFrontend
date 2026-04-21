'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
    let path = usePathname()
    const [hoverBorderColor, setHoverBorderColor] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getBorderColor = () => {
        if (hoverBorderColor) return hoverBorderColor;
        return path.startsWith('/transparencia') ? 'border-blue-base' : 'border-green-base';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 w-full h-24 bg-black-base border-b-4 transition-colors duration-300 ${getBorderColor()} flex flex-row justify-between`}>
                <div className="h-full flex justify-center items-center">
                    <Link href={'/'}>
                    <img src="/logo_municipio.png" alt="" className="w-4/5 pl-2" />
                    </Link>
                </div>
                {/* Desktop Navigation */}
                <div className="hidden md:flex w-3/4 h-full flex-col justify-between items-end">
                    <div className="w-1/5 bg-green-base py-1 rounded-bl-xl flex flex-row justify-around">
                        <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="/Facebook.png" alt="" />
                        <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="/Mail.png" alt="" />
                        <img className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110" src="/Instagram.png" alt="" />
                    </div>
                    <div className="w-5/5 flex flex-row self-center justify-evenly">
                        <Link
                            href={'/transparencia'}
                            className={`w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 ${path.startsWith('/transparencia') ? 'bg-blue-base' : ''} hover:bg-blue-base`}
                            onMouseEnter={() => setHoverBorderColor('border-blue-base')}
                            onMouseLeave={() => setHoverBorderColor(null)}
                        >
                            TRANSPARENCIA
                        </Link>
                        <Link
                            href={'https://datos.loberia.gov.ar'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 hover:bg-red-base"
                            onMouseEnter={() => setHoverBorderColor('border-red-base')}
                            onMouseLeave={() => setHoverBorderColor(null)}
                        >
                            DATOS ABIERTOS
                        </Link>
                        <Link
                            href={'https://sibom.slyt.gba.gob.ar/cities/73'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit py-1 px-4 cursor-pointer text-center font-bold rounded-t-xl transition-colors duration-300 hover:bg-yellow-base"
                            onMouseEnter={() => setHoverBorderColor('border-yellow-base')}
                            onMouseLeave={() => setHoverBorderColor(null)}
                        >
                            BOLETIN OFICIAL
                        </Link>
                    </div>
                </div>
                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center pr-4">
                    <button
                        onClick={toggleMobileMenu}
                        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-8 h-0.5 bg-white-base transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white-base transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white-base transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </nav>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black-base/80 z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}
            {/* Mobile Menu */}
            <div className={`fixed top-24 right-0 z-50 w-64 bg-black-base border-l-4 border-b-4 rounded-bl-4xl transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${getBorderColor()}`}>
                <div className="flex flex-col items-center py-4">
                    <Link
                        href={'/transparencia'}
                        className={`w-fit py-3 text-center font-bold`}
                    >
                        TRANSPARENCIA
                    </Link>
                    <Link
                        href={'https://datos.loberia.gov.ar'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit py-3 text-center font-bold"
                    >
                        DATOS ABIERTOS
                    </Link>
                    <Link
                        href={'https://sibom.slyt.gba.gob.ar/cities/73'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit py-3 text-center font-bold"
                    >
                        BOLETIN OFICIAL
                    </Link>
                </div>
                <div className="py-4 flex flex-row justify-around">
                    <img className="w-6" src="/Facebook.png" alt="" />
                    <img className="w-6" src="/Mail.png" alt="" />
                    <img className="w-6" src="/Instagram.png" alt="" />
                </div>
            </div>
        </>
    )
}