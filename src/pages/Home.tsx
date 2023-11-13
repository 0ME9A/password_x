import { Container, IconButton, Link, Paper, useTheme } from "@mui/material";
import { setWindowName } from "../RTK/slices/toggleWindow";
import { useDispatch, useSelector } from "react-redux";
import { HISTORY, SETTINGS } from "../RTK/type";
import { RootState } from "../RTK/store";

import PasswordGenerator from "../components/password/PasswordGenerator";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import Typography from "@mui/material/Typography";
import Settings from "./Tabs/Settings";
import History from "./Tabs/History";
import Box from "@mui/material/Box";

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    historyProps: { bookmark },
    activeWindow,
  } = useSelector((state: RootState) => state);

  const palette = theme.palette;

  return (
    <>
      <Container maxWidth={"sm"} sx={{ p: 1 }}>
        <Paper
          elevation={0}
          sx={{
            background: palette.background.default,
            opacity: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <img src="/logo32.png" alt="brand logo" width={24} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Password Generator
              </Typography>
            </Box>

            <Box>
              {bookmark && (
                <IconButton
                  title="History"
                  onClick={() => dispatch(setWindowName({ tab: HISTORY }))}
                >
                  <HistoryIcon />
                </IconButton>
              )}
              <IconButton
                title="Settings"
                onClick={() => dispatch(setWindowName({ tab: SETTINGS }))}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>

          {/* --------------------- */}
          <Box
            sx={{
              minHeight: "400px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {!activeWindow.tab && <PasswordGenerator />}
            {activeWindow.tab === HISTORY && <History />}
            {activeWindow.tab === SETTINGS && <Settings />}
          </Box>
          {/* --------------------- */}
          <Box sx={{ textAlign: "center", py: 1 }}>
            <Link href={"https://password.ome9a.com"} target="_blank">
              Explore more
            </Link>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Home;
