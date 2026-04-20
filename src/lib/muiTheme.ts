import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Linotte, sans-serif",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "Linotte, sans-serif",
        },
      },
    },
  },
});

export default muiTheme;
