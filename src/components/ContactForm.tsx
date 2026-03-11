import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Controller, useForm, FieldValues, FieldError } from "react-hook-form";

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

  const onSubmit = (data: ContactFormValues) => {
    const payload = {
      name: data.name,
      message: data.message,
      phone: data.phone,
      whatsapp: data.subscribe,
    };

    console.log(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-xl bg-white-base rounded-2xl shadow-xl p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-black-base hover:text-red-base text-xl font-bold"
          aria-label="Cerrar contacto"
        >
          X
        </button>
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
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                  />
                }
                label="Quiero recibir noticias del municipio por WhatsApp"
                sx={{ color: "var(--color-black-dark)" }}
              />
            )}
          />

          <TextField
            label="Número de teléfono"
            fullWidth
            hidden={!subscribe}
            {...register("phone", {
              validate: (value: string) =>
                !subscribe ||
                value.trim() !== "" ||
                "El número de teléfono es obligatorio",
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <Button variant="contained" type="submit"
          sx={{ backgroundColor: "var(--color-green-base)" }}>
            Enviar mensaje
          </Button>
        </Box>
      </div>
    </div>
  );
}

