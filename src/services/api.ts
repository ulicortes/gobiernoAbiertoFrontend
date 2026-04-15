import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Esto asegura que la cookie viaje siempre
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Sesión expirada o inválida. Limpiando...");

      // Borramos el rastro del frontend
      localStorage.clear();

      // Redirigimos al login (opcional, depende de tu flujo)
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
