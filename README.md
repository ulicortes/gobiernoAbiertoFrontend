# Portal Gobierno Abierto — Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-red?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-7-007fff?logo=mui&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)

## Breve descripción

Frontend del **Portal de Gobierno Abierto de Lobería**: sitio público de transparencia y **panel administrativo** para gestionar categorías, archivos PDF y usuarios. Se comunica con la API NestJS del backend mediante cookies HTTP-only (JWT).

Para detalles de organización del código, ver [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Stack

- **Next.js 16** (App Router) con **export estático** (`out/`)
- **React 19**, **TypeScript**, **MUI 7**, **Tailwind CSS 4**
- **Axios** con `withCredentials` hacia el backend

## Requisitos previos

- **Node.js** ≥ 18.19 (recomendado 20 LTS)
- **npm**
- **Backend** levantado y accesible desde el navegador (CORS y cookies configurados). Ver [gobierno-abierto-backend/README.md](../gobierno-abierto-backend/README.md).

## Configuración

1. Clonar el repositorio e instalar dependencias:

```bash
cd gobiernoAbiertoFrontend
npm install
```

2. Copiar variables de entorno:

```bash
cp env.example .env.local
```

3. Editar `.env.local` según [env.example](env.example). La variable obligatoria es `NEXT_PUBLIC_BACKEND_PATH` (URL base de la API, sin barra final).

> El login y el panel **no funcionan** si el backend no está en marcha o si CORS no permite el origen del frontend con credenciales.

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo en [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Genera el sitio estático en la carpeta `out/` |
| `npm run start` | Sirve la app en modo Node (útil en desarrollo; **no** es el despliegue estático de producción) |
| `npm run lint` | Ejecuta ESLint |

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

- Rutas públicas: inicio, transparencia.
- `/login/`: acceso al panel.
- `/panel/*`: requiere sesión válida en el backend (cookie JWT).

Asegurarse de que `NEXT_PUBLIC_BACKEND_PATH` apunte al backend (por ejemplo `http://localhost:3001`) y que el backend tenga configurado el origen del frontend en CORS.

## Build y despliegue

Este proyecto usa **export estático** (`output: "export"` en `next.config.ts`), con `trailingSlash: true` (rutas tipo `/transparencia/`).

```bash
npm run build
```

El resultado queda en **`out/`**. En producción se debe servir esa carpeta como sitio estático (Apache, Nginx, etc.), **no** depender de `next start` ni de un runtime Node en el servidor.

Implicaciones:

- Las rutas dinámicas de categorías se pregeneran en **build time** (`generateStaticParams` consulta al backend). Si la API no está disponible durante el build, puede fallar o generar rutas incompletas.
- Las imágenes usan `unoptimized: true` (compatible con hosting estático).

## Rutas principales

| Ruta | Uso |
|------|-----|
| `/` | Inicio público |
| `/transparencia/` | Listado y navegación por secciones |
| `/transparencia/[categoria]/` | Archivos de una categoría (slug) |
| `/login/` | Inicio de sesión |
| `/panel/` | Redirige a archivos o categorías |
| `/panel/archivos/[categorySlug]/` | Gestión de archivos por categoría |
| `/panel/categorias/` | ABM de categorías |
| `/panel/usuarios/` | Gestión de usuarios |
| `/panel/password/` | Cambio de contraseña propia |

## Backend

API, autenticación, Docker y seguridad: [../gobierno-abierto-backend/README.md](../gobierno-abierto-backend/README.md).

Requisitos cruzados en despliegue:

- CORS del backend debe incluir el origen exacto del frontend.
- Cookies de sesión requieren configuración coherente (mismo sitio, dominio o `Secure`/`SameSite` según el entorno).

## Documentación adicional

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — carpetas, auth, capa `servicio`, build estático
