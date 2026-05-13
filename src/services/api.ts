import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_PATH,
  withCredentials: true, // Esto asegura que la cookie viaje siempre
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. NO redirigir si la petición fallida es la de verificación
    // Esto permite que el AuthProvider decida qué hacer sin refrescar la página
    if (error.config && error.config.url.includes('/auth/verify')) {
      return Promise.reject(error);
    }

    // 2. Para el resto de las peticiones (ej: guardar un trámite), 
    // sí redirigimos si el token expiró mientras el usuario navegaba.
    if (error.response && error.response.status === 401) {
      console.log("Sesión expirada. Redirigiendo...");
      // Evitamos usar window.location.href aquí si es posible para no perder el estado
      // pero si lo dejas, que no afecte a /verify
      window.location.href = "/login/";
    }

    return Promise.reject(error);
  }
);

export default api;
