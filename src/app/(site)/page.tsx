'use client';

import { useState } from "react";
import InformesGestion from "@/components/public/InformesGestion";
import HeroSection from "@/components/public/HeroSection";
import SeccionContenido from "@/components/public/SeccionContenido";
import GuiaUsuario from "@/components/public/GuiaUsuario";
import ContactSection from "@/components/public/ContactSection";
import ContactForm from "@/components/forms/ContactForm";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const imagenHero = "/WelcomePage_HeroBackgroundImage.png";
  const secciones = [
    {
      titulo: "TRANSPARENCIA",
      texto:
        "Información para la ciudadanía.",
      imagenFondo: "/WelcomePage_TransparenciaBackgroundImage.png",
      link: "/transparencia",
    },
    {
      titulo: "DATOS ABIERTOS",
      texto:
        "Aquí podrás encontrar información pública en formatos abiertos para su libre uso.",
      imagenFondo: "/WelcomePage_DatosAbiertosBackgroundImage.png",
      link: "https://datos.loberia.gov.ar",
    },
    {
      titulo: "BOLETÍN OFICIAL",
      texto:
        "Accedé a la legislación municipal vigente.",
      imagenFondo: "/WelcomePage_BoletinOficialBackgroundImage.png",
      link: "https://sibom.slyt.gba.gob.ar/cities/73",
    },
  ];

  return (
    <div className="relative w-full flex flex-col justify-center items-center bg-white">
      <HeroSection imagenFondo={imagenHero} />
      
      {secciones.map((seccion, index) => (
        <SeccionContenido
          key={index}
          titulo={seccion.titulo}
          texto={seccion.texto}
          imagenFondo={seccion.imagenFondo}
          link={seccion.link}
        />
      ))}

      <InformesGestion />

      <GuiaUsuario />

      <ContactSection onContactClick={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <ContactForm onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
