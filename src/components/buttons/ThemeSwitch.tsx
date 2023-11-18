import { setThemeMode } from "../../RTK/slices/themeMode";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { RootState } from "../../RTK/store";
import { DARK } from "../../RTK/type";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

function ThemeSwitch() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    themeMode: { mode },
  } = useSelector((state: RootState) => state);

  const handleTheme = () => {
    dispatch(setThemeMode(mode));
  };

  return (
    <IconButton
      sx={{ ml: 1 }}
      title={`${theme.palette.mode === DARK ? "Dark mode" : "Light mode"}`}
      onClick={handleTheme}
      color="inherit"
    >
      {theme.palette.mode === DARK ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default ThemeSwitch;
