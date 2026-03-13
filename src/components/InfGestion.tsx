import { useState } from "react";

export default function InfGestion() {
    const years = [2024, 2025, 2026, 2027];

    let [message, setMessage] = useState("");
    function showData(year: number) {
        if (year > 2025) {
            setMessage(`Todavia no se encuentra el informe del año ${year}.`);
        } else {
            alert("DESCARGA")
        }
    }

    return (
        <section className="w-full py-16 bg-white">
            <div className="py-12 px-8 bg-green-base from-green-light to-green-base flex flex-col items-center justify-center gap-8">
                <h2 className="text-white-base text-3xl md:text-4xl font-bold text-center">
                    MIRÁ TODO LO QUE VENIMOS HACIENDO EN LOBERÍA
                </h2>
                <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6">
                    {years.map((year) => (
                        <div
                            onClick={() => showData(year)}
                            key={year}
                            className="bg-white-base rounded-lg px-6 py-4 text-center flex flex-col items-center justify-center min-w-[120px] shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg/40 hover:scale-105"
                        >
                            <h3 className="text-4xl md:text-4xl font-bold text-black-base mb-1">
                                {year}
                            </h3>
                            <p className="text-sm md:text-base text-black-base font-sans">
                                Informe de gestión
                            </p>
                        </div>
                    ))}
                </div>
                {message &&
                    <div className="w-3/5 flex flex-row justify-between items-center bg-black-dark py-1 px-4 rounded-xl">
                        <h2 className="text-2xl">{message}</h2>
                        <h2 onClick={() => setMessage("")} className="cursor-pointer hover:underline">Cerrar</h2>
                    </div>
                }
            </div>
        </section>
    )
}