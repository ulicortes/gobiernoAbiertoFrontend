"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { servicio } from "@/services/service";
import { NewCategory } from "@/types/newCategory";

interface HijoAPadreProps {
  enviarAlPadre: Dispatch<SetStateAction<string>>;
}

export default function AddCategoryForm({ enviarAlPadre }: HijoAPadreProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySection, setNewCategorySection] = useState("");

  async function newCategory() {
    const data: NewCategory = {
      name: newCategoryName,
      section: newCategorySection,
    };
    try {
      await servicio.insertarCategoria(data);
      console.log("Categoria creada!");
      setNewCategoryName("");
      setNewCategorySection("");
      enviarAlPadre(Date.now().toString());
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Nombre de categoría"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        size="small"
      />
      <TextField
        select
        label="Sección"
        value={newCategorySection}
        onChange={(e) => setNewCategorySection(e.target.value)}
        size="small"
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="home">HOME</MenuItem>
        <MenuItem value="transparencia">TRANSPARENCIA</MenuItem>
      </TextField>
      <Button
        variant="contained"
        disabled={!newCategoryName || !newCategorySection}
        onClick={() => newCategory()}
        sx={{
          backgroundColor: "var(--color-blue-base)",
          "&:hover": { backgroundColor: "var(--color-blue-dark)" },
          "&.Mui-disabled": { backgroundColor: "#c0c0c0", color: "#666" },
        }}
      >
        Agregar categoría
      </Button>
    </Box>
  );
}
