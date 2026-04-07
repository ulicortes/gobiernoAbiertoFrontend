import { UserLogin } from "@/types/userLogin";
import api from "./api";

const URL = 'http://localhost:3000';
export const servicio = {
    login: async (data: UserLogin) => {
        try {
            let res = await api.post(`/auth/login`, data);
            if(res.status == 200) {
                localStorage.setItem('isLogged', 'true');
                localStorage.setItem('userData', JSON.stringify(res.data.user));
            }
            return res;
        } catch (error) {
            console.log(error)
        }
    },
    getCategorias: async () => {
        try {
            let res = await api.get(`/category`)
            return res.data;
        } catch (error) {
            console.log(error);
        }

    },
    getUnaCategoria: async (id: number) => {
        try {
            let res = await api.get(`/category/${id}`)
            return res.data;
        } catch (error) {
            console.log(error);

        }
    },
    getArchivosDeUnaCategoria: async (catName: string) => {
        try {
            let res = await api.get(`/file/cat/${catName}`)
            return res.data;
        } catch (error) {
            console.log(error);

        }
    }
}
