"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import UserManagementPanel from "@/components/forms/UserManagementPanel";

export default function UsuariosPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      router.replace("/panel");
    }
  }, [user, router]);

  // Mientras no hay usuario confirmado o el rol no es super_admin, no renderizar nada
  if (!user || user.role !== "super_admin") return null;

  return <UserManagementPanel />;
}
