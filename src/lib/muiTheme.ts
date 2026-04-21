import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Linotte, sans-serif",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "sans-serif",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "sans-serif",
          "&.Mui-focused": {
            color: "var(--color-green-base)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-green-base)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: "sans-serif",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "sans-serif",
        },
      },
    },
  },
});

export default muiTheme;
