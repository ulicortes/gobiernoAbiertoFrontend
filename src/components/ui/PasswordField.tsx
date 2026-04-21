"use client";

import { forwardRef, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface PasswordFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { id, name, placeholder, value, onChange, required, minLength, autoComplete },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    return (
      <TextField
        id={id}
        inputRef={ref}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        size="small"
        fullWidth
        inputProps={{ minLength, name }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setVisible((v) => !v)}
                edge="end"
                aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1}
              >
                {visible ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);

export default PasswordField;
