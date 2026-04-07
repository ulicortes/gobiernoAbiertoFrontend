'use client'

import { UserLogin } from "@/types/userLogin"
import Footer from "./Footer"
import Nav from "./Nav"
import { servicio } from "@/services/service"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { navigate } from "next/dist/client/components/segment-cache/navigation"

interface LoginMenuProps {
  onClose?: () => void
}

export default function LoginMenu({ onClose }: LoginMenuProps) {

  async function login(formData: FormData) {
    let data = {
      username: formData.get('user')?.toString(),
      password: formData.get('password')?.toString()
    }
    try {
      await servicio.login(data)
      redirect('/panel')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full min-h-screen h-[110%] flex flex-col justify-between items-center">
      <Nav />
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
            <label htmlFor="login-email" className="text-black text-base font-normal">
              Usuario
            </label>
            <input
              id="login-user"
              type="text"
              placeholder="Usuario"
              name="user"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="login-password" className="text-black text-base font-normal">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Contraseña"
              name="pass"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#333333] text-white font-normal py-2.5 rounded-lg hover:bg-black/90 transition-colors"
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
      <Footer />
    </div>
  )
}
