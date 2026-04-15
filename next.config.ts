import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.77", "192.168.0.77:3000"],

  experimental: {
    // Opción 2: Dentro de experimental (donde algunas sub-versiones de la 15/16 lo requieren)
    // @ts-ignore
    allowedDevOrigins: ["192.168.0.77", "192.168.0.77:3000"],

    serverActions: {
      allowedOrigins: ["192.168.0.77:3000", "localhost:3000"],
    },
  },
};

export default nextConfig;
