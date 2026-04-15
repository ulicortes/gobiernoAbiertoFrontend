import ColorDivider from "@/components/ColorDivider";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function PanelHeader() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")) || "");

  function cerrar_sesion() {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("data");
    redirect("/login");
  }

  return (
    <header className="w-full flex flex-col items-center bg-white border-b border-gray-200">
      <div className="w-full flex flex-row justify-between items-center px-4 md:px-8 py-3">
        <img src="./logo_municipio_negro.png" alt="" />
        <div className="w-fit flex flex-col justify-end items-end">
          <p className="text-sm md:text-base text-black-base">
            Bienvenido, {user.username}
          </p>
          <button
            onClick={cerrar_sesion}
            className="bg-black text-white w-fit rounded-xl px-2 cursor-pointer"
          >
            Cerrar sesion
          </button>
        </div>
      </div>
      <ColorDivider barHeight="h-1.5" />
    </header>
  );
}
