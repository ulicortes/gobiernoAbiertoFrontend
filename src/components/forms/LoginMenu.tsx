"use client";

import { useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { servicio } from "@/services/service";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/ui/PasswordField";

interface LoginMenuProps {
  onClose?: () => void;
}

export default function LoginMenu({ onClose }: LoginMenuProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  async function login(formData: FormData) {
    setErrorMsg("");
    const data = {
      email: formData.get("email")?.toString().trim() || "",
      password: formData.get("pass")?.toString() || "",
    };
    try {
      const res = await servicio.login(data);
      if (!res) {
        setErrorMsg("Credenciales inválidas");
        return;
      }
      router.push("/panel");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message || "Correo o contraseña incorrectos");
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center">
      <div className="w-[70%] h-fit mt-30 max-w-md md:max-w-xl bg-[#F5F5F5] rounded-2xl p-6 md:p-2 relative shadow-xl flex flex-col items-center gap-6 md:gap-8">
        {/* Cerrar */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black font-bold text-xl hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            X
          </button>
        )}

        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold text-black text-center pt-10">
          INICIAR SESIÓN DE ADMINISTRADOR
        </h1>

        {/* Formulario (tarjeta blanca) */}
        <form
          action={login}
          className="w-[85%] md:w-[70%] bg-white rounded-xl p-6 flex flex-col gap-4 shadow-md"
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="login-email"
              className="text-black text-base font-normal"
            >
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="correo@municipio.gob.ar"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="login-password"
              className="text-black text-base font-normal"
            >
              Contraseña
            </label>
            <PasswordField
              id="login-password"
              placeholder="Contraseña"
              name="pass"
              autoComplete="current-password"
            />
          </div>
          {errorMsg && <p className="text-red-500 text-sm text-center font-medium">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-[#333333] text-white font-normal py-2.5 rounded-lg hover:bg-black/90 transition-colors cursor-pointer"
          >
            Ingresar
          </button>
          <a
            href="#"
            className="text-sm text-black underline hover:no-underline mt-1"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </form>

        {/* Footer: logo + texto */}
        <div className="w-full flex flex-row items-center justify-center gap-3 pt-2">
          <img
            src="/logo_municipio_negro.png"
            alt="Municipalidad de Lobería"
            className="w-60 h-28 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
