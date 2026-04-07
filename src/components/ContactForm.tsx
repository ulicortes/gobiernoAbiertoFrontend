import { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { Controller, useForm, FieldValues, FieldError } from "react-hook-form";
import { submitContactForm } from "@/lib/resendAction";

type ContactFormProps = {
  onClose: () => void;
};

type ContactFormValues = {
  name: string;
  message: string;
  subscribe: boolean;
  phone: string;
};

export default function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      message: "",
      subscribe: false,
      phone: "",
    },
  });

  const subscribe = watch("subscribe");

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("message", data.message);
      formData.append("phone", data.phone ?? "");
      formData.append("subscribe", data.subscribe ? "on" : "off");
      await submitContactForm(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError("No se pudo enviar el mensaje. Intentá nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-xl bg-white-base rounded-2xl shadow-xl p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-black-base hover:text-red-base text-xl font-bold cursor-pointer"
          aria-label="Cerrar contacto"
        >
          X
        </button>
        {isSubmitted ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h5"
              sx={{ color: "var(--color-black-dark)", mb: 2 }}
            >
              ¡Gracias por escribirnos!
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--color-black-dark)" }}>
              Recibimos tu mensaje y será leído por el equipo municipal.
              <br />
              Recordá que también podés comunicarte con Atención al Vecino al{" "}
              <Link href="tel:08009995623" sx={{ color: "var(--color-green-dark)", fontWeight: "bold", textDecoration: "underline" }}>
                0800 999 5623
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "var(--color-black-dark)" }}
            >
              Contacto
            </Typography>

            <TextField
              label="Nombre y apellido"
              fullWidth
              {...register("name")}
            />

            <TextField
              label="Mensaje"
              fullWidth
              multiline
              rows={4}
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
              error={!!errors.message}
              helperText={errors.message?.message}
            />

            <Controller
              name="subscribe"
              control={control}
              render={({ field }: { field: FieldValues }) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Checkbox
                    {...field}
                    checked={field.value}
                  />
                  <Typography sx={{ color: "var(--color-black-dark)" }}>
                    Quiero recibir noticias del municipio por WhatsApp
                  </Typography>
                </Box>
              )}
            />

            <TextField
              label="Número de teléfono"
              fullWidth
              hidden={!subscribe}
              {...register("phone", {
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, "");
                },
                validate: (value: string) =>
                  !subscribe ||
                  value.trim() !== "" ||
                  "El número de teléfono es obligatorio",
                minLength: {
                  value: 8,
                  message: "Ingresá un número válido (mínimo 8 dígitos)",
                },
                maxLength: {
                  value: 15,
                  message: "Ingresá un número válido (máximo 15 dígitos)",
                },
                pattern: {
                  value: /^\d*$/,
                  message: "Solo se permiten números",
                },
              })}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 15,
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <Button variant="contained" type="submit"
            sx={{ backgroundColor: "var(--color-green-base)" }}>
              Enviar mensaje
            </Button>
            {submitError && (
              <Typography sx={{ color: "red", fontSize: 14 }}>
                {submitError}
              </Typography>
            )}
          </Box>
        )}
      </div>
    </div>
  );
}

