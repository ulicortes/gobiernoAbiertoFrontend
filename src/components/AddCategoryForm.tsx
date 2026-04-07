'use client';

import { useState } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

export default function AddCategoryForm() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySection, setNewCategorySection] = useState('');

  return (
    <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
        <MenuItem value="HOME">HOME</MenuItem>
        <MenuItem value="TRANSPARENCIA">TRANSPARENCIA</MenuItem>
      </TextField>
      <Button
        variant="contained"
        disabled={!newCategoryName || !newCategorySection}
        onClick={() => {
          console.log({ newCategoryName, newCategorySection });
          alert(`Futura categoría agregada: ${newCategoryName} en ${newCategorySection}`);
          setNewCategoryName('');
          setNewCategorySection('');
        }}
        sx={{
          backgroundColor: 'var(--color-blue-base)',
          '&:hover': { backgroundColor: 'var(--color-blue-dark)' },
          '&.Mui-disabled': { backgroundColor: '#c0c0c0', color: '#666' }
        }}
      >
        Agregar categoría
      </Button>
    </Box>
  );
}
