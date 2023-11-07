import { useTheme } from "@mui/material";
import { Suspense, lazy } from "react";

import InitialScreen from "./initialScreen";
import Box from "@mui/material/Box";

const Home = lazy(() => import("./pages/Home"));

function Main() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: " 400px",
        minWidth: "400px",
        bgcolor: theme.palette.background.default,
        gap: 1,
      }}
    >
      <Suspense fallback={<InitialScreen />}>
        {/* <Box sx={{ height: small ? "1rem" : "3rem" }}></Box> */}
        <Home />
      </Suspense>
    </Box>
  );
}

export default Main;
