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
import { servicio } from "@/services/service";
import { ContactFormValues } from "@/types/contactFormValues";

type ContactFormProps = {
  onClose: () => void;
};

export default function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWithSubscribe, setSubmittedWithSubscribe] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("message", data.message);
      formData.append("subscribe", data.subscribe ? "on" : "off");
      await servicio.sendEmail(data);
      setIsSubmitted(true);
      setSubmittedWithSubscribe(data.subscribe);
      if (data.subscribe) {
        window.open("https://wa.me/5492261413354?text=Hola,%20quiero%20recibir%20noticias", "_blank");
      }
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
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography
              variant="h5"
              sx={{ color: "var(--color-black-dark)", mb: 2 }}
            >
              ¡Gracias por escribirnos!
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--color-black-dark)", mb: 2 }}>
              Recibimos tu mensaje y será leído por el equipo municipal.
              <br />
              Recordá que también podés comunicarte con Atención al Vecino al{" "}
              <Link href="tel:08009995623" sx={{ color: "var(--color-green-dark)", fontWeight: "bold", textDecoration: "underline" }}>
                0800 999 5623
              </Link>
            </Typography>
            {submittedWithSubscribe && (
              <Typography variant="body1" sx={{ color: "var(--color-black-dark)", fontWeight: "bold" }}>
                Fue redirigido a WhatsApp. Muchas gracias por elegir el servicio de difusión del municipio.
              </Typography>
            )}
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
              Dejanos tu mensaje
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

