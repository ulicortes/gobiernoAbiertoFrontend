"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { servicio } from "@/services/service";
import type { PanelUserRow } from "@/types/managedUser";
import PasswordField from "@/components/ui/PasswordField";

interface ResetPasswordProps {
  user: PanelUserRow | null;
  onClose: () => void;
}

export default function ResetPassword({ user, onClose }: ResetPasswordProps) {
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) {
      setNewPw("");
      setNewPw2("");
      setError("");
    }
  }, [user]);

  function handleClose() {
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    if (newPw.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    if (newPw !== newPw2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setPending(true);
    try {
      await servicio.adminResetUserPassword(user.id, newPw);
      handleClose();
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string | string[] } } };
      const m = ax.response?.data?.message;
      setError(
        Array.isArray(m) ? m.join(" ") : m || "No se pudo actualizar la contraseña."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={!!user} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Nueva contraseña</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Cuenta de:{" "}
          <strong>
            {user?.name} {user?.surname}
          </strong>
        </Typography>
        <Box
          component="form"
          id="reset-pw-form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 0.5 }}
        >
          <PasswordField
            placeholder="Nueva contraseña"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            required
            minLength={4}
            autoComplete="new-password"
          />
          <PasswordField
            placeholder="Repetir contraseña"
            value={newPw2}
            onChange={(e) => setNewPw2(e.target.value)}
            required
            minLength={4}
            autoComplete="new-password"
          />
          {error && (
            <Alert severity="error" sx={{ py: 0.5 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none", borderColor: "grey.400", color: "text.secondary" }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="reset-pw-form"
          variant="contained"
          disabled={pending}
          sx={{
            bgcolor: "#333",
            "&:hover": { bgcolor: "#111" },
            textTransform: "none",
          }}
        >
          {pending ? "Guardando…" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
