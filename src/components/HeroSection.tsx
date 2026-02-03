interface HeroSectionProps {
  imagenFondo?: string;
}

export default function HeroSection({ imagenFondo }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Imagen de fondo con blur */}
      {imagenFondo && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imagenFondo})`,
            filter: 'blur(5px)',
            transform: 'scale(1.1)',
          }}
        ></div>
      )}
      <div className="relative z-10 w-full max-w-4xl px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-8">
          GOBIERNO ABIERTO
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
          Comprometidos con los principios de Gobierno Abierto, trabajamos en la transparencia, la participación y la colaboración con el objetivo de aumentar la eficiencia y la eficacia en la administración pública.
        </p>
      </div>
      {/* Color separator */}
      <div className="absolute bottom-0 w-full flex flex-row z-10">
        <div className="w-1/4 h-1 bg-green-base"></div>
        <div className="w-1/4 h-1 bg-yellow-base"></div>
        <div className="w-1/4 h-1 bg-red-base"></div>
        <div className="w-1/4 h-1 bg-blue-base"></div>
      </div>
    </section>
  );
}
