import ColorDivider from "@/components/ui/ColorDivider";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { servicio } from "@/services/service";
import Link from "next/link";

export default function PanelHeader() {
  const { user } = useAuth();
  const router = useRouter();

  async function cerrar_sesion() {
    await servicio.logout();
    router.push("/login");
  }

  return (
    <header className="w-full flex flex-col items-center bg-white border-b border-gray-200">
      <div className="w-full flex flex-row justify-between items-center px-4 md:px-8 py-3">
        <Link href="/">
          <img src="./logo_municipio_negro.png" alt="Inicio" className="cursor-pointer" />
        </Link>
        <div className="w-fit flex flex-col justify-end items-end">
          <p className="text-sm md:text-base text-black-base">
            Bienvenido, {user?.username || "Usuario"}
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
