"use client";

import { useState } from "react";
import { servicio } from "@/services/service";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/ui/PasswordField";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface LoginMenuProps {
  onClose?: () => void;
}

export default function LoginMenu({ onClose }: LoginMenuProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  // async function login(formData: FormData) {
  //   setErrorMsg("");
  //   const data = {
  //     email: formData.get("email")?.toString().trim() || "",
  //     password: formData.get("pass")?.toString() || "",
  //   };
  //   try {
  //     const res = await servicio.login(data);
  //     if (!res) {
  //       setErrorMsg("Credenciales inválidas");
  //       return;
  //     }
  //     router.push("/panel");
  //   } catch (error: unknown) {
  //     console.log(error);
  //     setErrorMsg("Correo o contraseña incorrectos");
  //   }
  // }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); 
  setErrorMsg("");

  const formData = new FormData(e.currentTarget);
  const data = {
    email: formData.get("email")?.toString().trim() || "",
    password: formData.get("pass")?.toString() || "",
  };

  try {
    const res = await servicio.login(data); 
    if (!res) {
      setErrorMsg("Credenciales inválidas");
      return;
    }
    router.push("/panel");
  } catch (error: unknown) {
    console.log(error);
    setErrorMsg("Correo o contraseña incorrectos");
  }
};

  return (
    <div className="w-full min-h-screen flex justify-center">
      <Box
        sx={{
          width: "70%",
          maxWidth: { xs: "28rem", md: "36rem" },
          height: "fit-content",
          mt: "7.5rem",
          bgcolor: "#F5F5F5",
          borderRadius: 4,
          px: { xs: 3, md: 1 },
          py: { xs: 3, md: 1 },
          boxShadow: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, md: 4 },
          position: "relative",
        }}
      >
        {onClose && (
          <IconButton
            onClick={onClose}
            aria-label="Cerrar"
            size="small"
            sx={{ position: "absolute", top: 12, right: 12 }}
          >
            <CloseIcon />
          </IconButton>
        )}

        <Typography
          component="h1"
          fontWeight="bold"
          textAlign="center"
          color="text.primary"
          sx={{ pt: { md: 5 }, fontSize: "1.75rem" }}
        >
          INICIAR SESIÓN DE ADMINISTRADOR
        </Typography>

        {/* form nativo para mantener action={fn} con FormData */}
        <form
          // action={login}
          onSubmit={handleLogin}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: { xs: "85%", md: "70%" },
              bgcolor: "white",
              borderRadius: 2,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: 2,
            }}
          >

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2" color="text.primary">
                Correo electrónico
              </Typography>
              <TextField
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="correo@municipio.gob.ar"
                size="small"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2" color="text.primary">
                Contraseña
              </Typography>
              <PasswordField
                id="login-password"
                placeholder="Ingrese su contraseña"
                name="pass"
                autoComplete="current-password"
              />
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ py: 0.5 }}>
                {errorMsg}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#333",
                "&:hover": { bgcolor: "black" },
                textTransform: "none",
                py: 1.25,
                fontWeight: "normal",
              }}
            >
              Ingresar
            </Button>

            <Link
              href="#"
              variant="body2"
              color="text.primary"
              underline="always"
              sx={{ mt: 0.5 }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </form>

        <Box sx={{ pt: 1, pb: 1 }}>
          <img
            src="/logo_municipio_negro.png"
            alt="Municipalidad de Lobería"
            style={{ width: 240, height: 112, objectFit: "contain" }}
          />
        </Box>
      </Box>
    </div>
  );
}
