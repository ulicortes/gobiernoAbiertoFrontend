export default function InfGestion() {
    const years = [2025, 2024, 2023, 2022];

    return (
        <section className="w-full py-16 bg-white">
            <div className="py-12 px-8 bg-gradient-to-r from-blue-light to-green-base flex flex-col items-center justify-center gap-8">
                <h2 className="text-white-base text-3xl md:text-4xl font-bold text-center">
                    MIRÁ TODO LO QUE VENIMOS HACIENDO EN LOBERÍA
                </h2>
                <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6">
                    {years.map((year) => (
                        <div
                            key={year}
                            className="bg-white-base rounded-lg px-6 py-4 text-center flex flex-col items-center justify-center min-w-[120px] shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg/40 hover:scale-105"
                        >
                            <h3 className="text-4xl md:text-4xl font-bold text-black-base mb-1">
                                {year}
                            </h3>
                            <p className="text-sm md:text-base text-black-base font-normal">
                                Informe de gestión
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}