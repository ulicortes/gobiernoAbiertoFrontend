"use client";

import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { servicio } from "@/services/service";
import type { CreateManagedUserPayload, UserRole } from "@/types/managedUser";
import PasswordField from "@/components/ui/PasswordField";

interface CreateUserProps {
  onCreated: () => void;
}

export default function CreateUser({ onCreated }: CreateUserProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    const payload: CreateManagedUserPayload = { name, surname, email, password, role };
    setCreating(true);
    try {
      await servicio.createManagedUser(payload);
      setSuccess("Usuario creado correctamente.");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setRole("admin");
      onCreated();
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string | string[] } } };
      const m = ax.response?.data?.message;
      setError(Array.isArray(m) ? m.join(" ") : m || "No se pudo crear el usuario.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: 1,
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" fontWeight={600} color="text.primary">
        Nuevo usuario
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Apellido"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Correo"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="small"
          helperText="También se usa para iniciar sesión"
          sx={{ gridColumn: { sm: "span 2" } }}
        />
        <PasswordField
          placeholder="Contraseña inicial (mín. 4 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={4}
          autoComplete="new-password"
        />
        <FormControl size="small" required>
          <InputLabel>Rol</InputLabel>
          <Select
            value={role}
            label="Rol"
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="super_admin">Super administrador</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ py: 0.5 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ py: 0.5 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={creating}
          sx={{
            bgcolor: "#333",
            "&:hover": { bgcolor: "#111" },
            px: 4,
            textTransform: "none",
            minWidth: 160,
          }}
        >
          {creating ? "Creando…" : "Crear usuario"}
        </Button>
      </Box>
    </Box>
  );
}
