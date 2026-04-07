import axios from "axios";
const URL = 'http://localhost:3000';
// 1. Creamos la instancia con la configuración base
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // Esto asegura que la cookie viaje siempre
});

// 2. Configuramos el Interceptor de RESPUESTA
// Este código se ejecuta automáticamente DESPUÉS de cada petición, 
// antes de que llegue a tu .then() o .catch() en el componente.
api.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa (200-299), la dejamos pasar tal cual
        return response;
    },
    (error) => {
        // Si el servidor responde con 401 (No autorizado)
        if (error.response && error.response.status === 401) {
            console.log("Sesión expirada o inválida. Limpiando...");
            
            // Borramos el rastro del frontend
            localStorage.clear();
            
            // Redirigimos al login (opcional, depende de tu flujo)
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default api;