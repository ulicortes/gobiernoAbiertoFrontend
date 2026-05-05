import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // Crea carpetas por ruta (ideal para Apache)
  images: {
    unoptimized: true, // Evita errores con el componente <Image> en modo estático
  },
  allowedDevOrigins: ["192.168.0.77", "192.168.0.77:3000"],

  // experimental: {
    // allowedDevOrigins: ["192.168.0.77", "192.168.0.77:3000"],

    // serverActions: {
    //   allowedOrigins: ["192.168.0.77:3000", "localhost:3000"],
    // },
  // },
};

export default nextConfig;
