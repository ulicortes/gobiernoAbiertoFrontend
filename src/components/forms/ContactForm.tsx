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
  const [existContact, setContact] = useState(false);

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
      contacto: undefined,
      dni: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError("");
    try {
      // console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("message", data.message);
      formData.append("subscribe", data.subscribe ? "on" : "off");
      if (!data.contacto) {
        console.log("Hay que poner un metodo de contacto");
        return;
      }
      console.log(data);
      // return;
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
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
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

            <TextField
              label="DNI"
              fullWidth
              {...register("dni", {
                required: "El dni es obligatorio",
                validate: {
                  formato: (val) => /^\d{7,8}$/.test(val) || "El DNI debe tener 7 u 8 números",
                  noFalso: (val) => {
                    const secuenciales = ["1234567", "12345678", "87654321", "123456789"];
                    // Verifica si son todos números iguales (ej: 11111111)
                    const todosIguales = /^(\d)\1+$/.test(val);

                    if (secuenciales.includes(val) || todosIguales) {
                      return "Por favor, ingresá un número de DNI válido";
                    }
                    return true;
                  },
                  dni_logico: (val) => {
                    const dni = Number(val);
                    // console.log(getValues('telefono'))
                    if (dni < 2000000 || dni > 55000000) {
                      return "El número de DNI no corresponde a un rango válido";
                    }
                  }
                }
              })}
              error={!!errors.dni}
              helperText={errors.dni?.message}
            />

            <TextField
              label="Deja tu email o celular"
              fullWidth
              margin="normal"
              {...register("contacto", {
                validate: {
                  formato: (val) => {
                    const stringLimpio = val.toString().replace(/[\s\-\(\)]/g, "");

                    const celularRegex = /^(?:11|[23]\d{2,3})\d{6,8}$/;

                    if (!celularRegex.test(stringLimpio) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
                      return "Por favor ingresar un mail valido o un nro de celular con +549 seguido de la característica sin 0 y el celular sin 15";
                    }

                    return true;
                  },
                }
              })}
              error={!!errors.contacto}
              helperText={errors.contacto?.message}
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

