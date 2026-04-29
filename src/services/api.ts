import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_PATH,
  withCredentials: true, // Esto asegura que la cookie viaje siempre
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Sesión expirada o inválida. Limpiando...");

      localStorage.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
