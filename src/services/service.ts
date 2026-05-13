import { UserLogin } from "@/types/userLogin";
import { NewCategory } from "@/types/newCategory";
import type { CreateManagedUserPayload, PanelUserRow } from "@/types/managedUser";
import api from "./api";
import { toSlug } from "@/lib/slugify";
import { log } from "console";
import { ContactFormValues } from "@/types/contactFormValues";


export const servicio = {
  login: async (data: UserLogin) => {
    try {
      const res = await api.post(`/auth/login/`, data);

      if (res.data.statusCode == 200) return res.data.user;
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  verify: async () => {
    try {
      const res = await api.get(`/auth/verify`);
      if (res.data.statusCode == 200) return res.data.user;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  logout: async () => {
    try {
      const res = await api.post(`/auth/logout`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  changeOwnPassword: async (currentPassword: string, newPassword: string) => {
    const res = await api.patch(`/auth/me/password`, {
      currentPassword,
      newPassword,
    });
    return res.data;
  },
  listUsers: async (): Promise<PanelUserRow[]> => {
    const res = await api.get(`/user`);
    return res.data;
  },
  createManagedUser: async (data: CreateManagedUserPayload) => {
    const res = await api.post(`/user`, data);
    return res.data;
  },
  adminResetUserPassword: async (userId: string, newPassword: string) => {
    const res = await api.patch(`/user/${userId}/password`, {
      newPassword,
    });
    return res.data;
  },
  actualizarUsuario: async (id: string, data: Partial<import("@/types/managedUser").PanelUserRow>) => {
    const res = await api.patch(`/user/${id}`, data);
    return res.data;
  },
  eliminarUsuario: async (id: string) => {
    await api.delete(`/user/${id}`);
  },
  getCategorias: async () => {
    try {
      const res = await api.get(`/category`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUnaCategoria: async (id: number) => {
    try {
      const res = await api.get(`/category/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getArchivosDeUnaCategoria: async (catNameOrSlug: string) => {
    try {
      const res = await api.get(`/file/cat/${toSlug(catNameOrSlug)}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUltimosArchivosDeUnaCategoria: async (catNameOrSlug: string) => {
    try {
      const res = await api.get(`/file/cat/${toSlug(catNameOrSlug)}/latest`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  insertArchivo: async (
    file: File,
    categoryId: string,
    customName?: string,
    trimester?: string | null,
    year?: number,
    isAnnualBudget?: boolean,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", categoryId);
    if (customName) formData.append("customName", customName);
    if (trimester === null) formData.append("trimester", "null");
    else if (trimester) formData.append("trimester", trimester);
    if (year !== undefined) formData.append("year", year.toString());
    if (isAnnualBudget !== undefined) {
      formData.append("isAnnualBudget", String(isAnnualBudget));
    }
    try {
      const response = await api.post("/file/upload", formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error subiendo el archivo:", error);
      throw error;
    }
  },
  editarArchivo: async (
    id: string,
    name: string,
    trimester?: string,
    year?: string | number,
  ) => {
    try {
      const body: Record<string, any> = { name };
      if (trimester !== undefined && trimester !== "-")
        body.trimester = trimester;
      if (year !== undefined && year !== "-")
        body.year = typeof year === "string" ? parseInt(year, 10) : year;
      const response = await api.patch(`/file/${id}`, body);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  borrarArchivo: async (id: string) => {
    try {
      const response = await api.delete(`/file/${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  descargarArchivo: async (id: string) => {
    try {
      return await api.get(`/file/download/${id}`, {
        responseType: 'blob'
      });
    } catch (error) {
      console.log(error);
    }
  },
  descargarGuia: async () => {
    try {
      return await api.get(`/file/guide/download`, {
        responseType: 'blob'
      });
    } catch (error) {
      console.log(error);
    }
  },
  insertarCategoria: async (data: NewCategory) => {
    try {
      const response = await api.post("category", data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  borrarCategoria: async (id: number) => {
    try {
      const response = await api.delete(`category/${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  editarCategoria: async (id: number, cat: NewCategory) => {
    try {
      const response = await api.patch(`category/${id}`, cat);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  sendEmail: async (form: ContactFormValues) => {
    try {
      const response = await api.post('email/contact', form);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
