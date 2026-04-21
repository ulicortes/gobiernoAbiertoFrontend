
import Link from 'next/link';

interface SeccionContenidoProps {
  titulo: string;
  texto: string;
  imagenFondo?: string;
  link?: string;
}

export default function SeccionContenido({
  titulo,
  texto,
  imagenFondo,
  link,
}: SeccionContenidoProps) {
  const content = (
    <section className="group relative w-full min-h-[40vh] flex flex-col items-center justify-center text-white overflow-hidden cursor-pointer">
      {/* Imagen de fondo con blur */}
      {imagenFondo && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-600 ease-out group-hover:scale-110"
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
        <p className="text-lg md:text-xl leading-relaxed font-sans">{texto}</p>
      </div>
    </section>
  );

  if (link) {
    return (
      <Link href={link} className="block w-full">
        {content}
      </Link>
    );
  }

  return content;
}
