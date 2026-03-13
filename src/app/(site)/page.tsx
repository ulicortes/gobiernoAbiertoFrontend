'use client';

import { useState } from "react";
import InfGestion from "@/components/InfGestion";
import HeroSection from "@/components/HeroSection";
import SeccionContenido from "@/components/SeccionContenido";
import GuiaUsuario from "@/components/GuiaUsuario";
import ContactSection from "@/components/ContactSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    <div className="relative w-full flex flex-col justify-center items-center bg-white">
      <HeroSection imagenFondo={imagenHero} />
      
      {secciones.map((seccion, index) => (
        <SeccionContenido
          key={index}
          titulo={seccion.titulo}
          texto={seccion.texto}
          imagenFondo={seccion.imagenFondo}
        />
      ))}

      <InfGestion />

      <GuiaUsuario />

      <ContactSection onContactClick={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <ContactForm onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
