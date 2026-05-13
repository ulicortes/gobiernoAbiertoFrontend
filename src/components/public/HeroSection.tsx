import ColorDivider from "@/components/ui/ColorDivider";

interface HeroSectionProps {
  imagenFondo?: string;
}

export default function HeroSection({ imagenFondo }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden mt-24">
      {/* Imagen de fondo con blur */}
      {imagenFondo && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imagenFondo})`,
            filter: 'blur(3px)',
            transform: 'scale(1.1)',
          }}
        ></div>
      )}
      <div className="relative z-10 w-full max-w-4xl px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-8">
          GOBIERNO ABIERTO
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-sans">
          Creemos en un Estado cercano, abierto y que rinde cuentas.
        </p>
      </div>
      <ColorDivider className="absolute bottom-0 z-10" />
    </section>
  );
}
