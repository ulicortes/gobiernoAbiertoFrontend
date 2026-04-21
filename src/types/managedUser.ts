export type UserRole = "admin" | "super_admin";

export interface PanelUserRow {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export interface CreateManagedUserPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: UserRole;
}
