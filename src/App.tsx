import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./RTK/store";
import { useMemo } from "react";

import Main from "./main";

import "./App.css";

export default function App() {
  const {
    themeMode: { mode },
  } = useSelector((state: RootState) => state);

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#aaaaff" : "#190482", // Light blue for light mode, dark blue for dark mode
      },
      secondary: {
        main: mode === "light" ? "#000080" : "#1565c0", // Lighter blue for light mode, darker blue for dark mode
      },
      background: {
        paper: mode === "light" ? "#eeeeff" : "#00001f", // Very light blue for light mode, very dark blue for dark mode
        default: mode === "light" ? "#ddddff" : "#11112f", // Very light blue for light mode, very dark blue for dark mode
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff", // Black for light mode, white for dark mode
      },
      // Add more colors as needed
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
