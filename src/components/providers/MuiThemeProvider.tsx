"use client";

import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "@/lib/muiTheme";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
