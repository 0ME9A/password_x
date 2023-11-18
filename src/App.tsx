import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DARK, LIGHT, SETTINGS } from "./RTK/type";
import { PaletteMode } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./RTK/store";

import Main from "./main";

import "./App.css";
import { settingProps } from "./components/types/chromeStorageType";
import { setThemeMode } from "./RTK/slices/themeMode";
import { setPasswordAttributes, setSalt } from "./RTK/slices/setting";
import { toggleHistoryBookmark } from "./RTK/slices/history";

export default function App() {
  const {
    themeMode: { mode },
    historyProps,
    settingProps,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      primary: {
        main: mode === LIGHT ? "#aaaaff" : "#190482", // Light blue for light mode, dark blue for dark mode
      },
      secondary: {
        main: mode === LIGHT ? "#000080" : "#1565c0", // Lighter blue for light mode, darker blue for dark mode
      },
      background: {
        paper: mode === LIGHT ? "#eeeeff" : "#00001f", // Very light blue for light mode, very dark blue for dark mode
        default: mode === LIGHT ? "#ddddff" : "#11112f", // Very light blue for light mode, very dark blue for dark mode
      },
      text: {
        primary: mode === LIGHT ? "#000000" : "#ffffff", // Black for light mode, white for dark mode
      },
      // Add more colors as needed
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    try {
      window.chrome.storage.sync.get(
        [SETTINGS],
        (data: { [SETTINGS]: settingProps }) => {
          console.log(data);
          const s = data[SETTINGS];
          if (typeof s === "object" && s !== null) {
            dispatch(setThemeMode(s.mode === DARK ? LIGHT : DARK));
            dispatch(setSalt(s.advance.salt));
            dispatch(toggleHistoryBookmark(s.historyProps.bookmark));
            dispatch(setPasswordAttributes(s.advance.passwordAttributes));
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      window.chrome.storage.sync.set({
        [SETTINGS]: { historyProps, advance: settingProps, mode },
      });
    } catch (error) {
      console.log(error);
    }
  }, [historyProps, mode, settingProps]);

  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
