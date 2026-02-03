
interface SeccionContenidoProps {
  titulo: string;
  texto: string;
  imagenFondo?: string;
}

export default function SeccionContenido({
  titulo,
  texto,
  imagenFondo,
}: SeccionContenidoProps) {
  return (
    <section className="relative w-full min-h-[40vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Imagen de fondo con blur */}
      {imagenFondo && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imagenFondo})`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        ></div>
      )}
      <div className="relative z-10 w-full max-w-4xl px-8 py-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-8">
          {titulo}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed">{texto}</p>
      </div>
    </section>
  );
}
