"use client";

import { useState } from "react";
import { servicio } from "@/services/service";

export default function GuiaUsuario() {
  const [message, setMessage] = useState("");

  async function abrirGuia() {
    setMessage("");
    try {
      const response = await servicio.descargarGuia();
      if(!response) {
        setMessage("No hay una guia cargada por el momento. Disculpe las molestias");
        return;
      }
      const url = window.URL.createObjectURL(new Blob([response?.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jorge');

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="w-full py-10 pb-10 px-8 bg-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <button
          type="button"
          onClick={abrirGuia}
          className="w-fit px-8 py-4 bg-green-base text-white text-xl font-bold uppercase rounded-lg hover:bg-green-dark transition-all duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          GUÍA DE USUARIO
        </button>
        <p className="mt-8 text-center text-black-base font-sans max-w-2xl">
          Accedé a la guía de usuario para conocer cómo navegar y aprovechar todas las
          funcionalidades del portal.
        </p>
        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>
    </section>
  );
}
