import InfGestion from "@/components/InfGestion";
import HeroSection from "@/components/HeroSection";
import SeccionContenido from "@/components/SeccionContenido";
import GuiaUsuario from "@/components/GuiaUsuario";

export default function Home() {
  const imagenHero = "/WelcomePage_HeroBackgroundImage.png";
  const secciones = [
    {
      titulo: "TRANSPARENCIA",
      texto:
        "Acá iría un texto explicando brevemente lo que se encuentra en esta sección para mejorar la experiencia de usuario.",
      imagenFondo: "/WelcomePage_TransparenciaBackgroundImage.png",
    },
    {
      titulo: "DATOS ABIERTOS",
      texto:
        "Acá iría un texto explicando brevemente lo que se encuentra en esta sección para mejorar la experiencia de usuario.",
      imagenFondo: "/WelcomePage_DatosAbiertosBackgroundImage.png",
    },
    {
      titulo: "BOLETÍN OFICIAL",
      texto:
        "Acá iría un texto explicando brevemente lo que se encuentra en esta sección para mejorar la experiencia de usuario.",
      imagenFondo: "/WelcomePage_BoletinOficialBackgroundImage.png",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <HeroSection imagenFondo={imagenHero} />
      {secciones.map((seccion, index) => (
        <SeccionContenido
          key={index}
          titulo={seccion.titulo}
          texto={seccion.texto}
          imagenFondo={seccion.imagenFondo}
        />
      ))}
      <section className="w-full py-16 px-8">
        <InfGestion />
      </section>
      <GuiaUsuario />
    </div>
  );
}
